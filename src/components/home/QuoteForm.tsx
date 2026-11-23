import { useId, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import {
  LIMITS,
  QUOTE_BUDGETS,
  QUOTE_CATEGORIES,
  buildWhatsAppUrl,
  validateQuote,
  type QuoteErrors,
  type QuoteRequest,
} from "@/lib/quote";
import { Reveal } from "@/components/site/Reveal";

const EMPTY: QuoteRequest = {
  name: "",
  city: "",
  category: QUOTE_CATEGORIES[0],
  quantity: "",
  budget: QUOTE_BUDGETS[0],
  details: "",
};

type Status = { kind: "opened" | "blocked"; url: string } | null;

/**
 * Free sourcing quote form. Nothing is stored or sent from this site: on submit it opens WhatsApp
 * with the details filled in, and the visitor presses Send there.
 */
export function QuoteForm() {
  const uid = useId();
  const [values, setValues] = useState<QuoteRequest>(EMPTY);
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>(null);

  const update = (field: keyof QuoteRequest) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...values, [field]: e.target.value };
    setValues(next);
    if (submitted) setErrors(validateQuote(next));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    const found = validateQuote(values);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    const url = buildWhatsAppUrl(values);
    const win = window.open(url, "_blank", "noopener,noreferrer");
    // With "noopener" most browsers return null even on success, so only a closed window counts as blocked.
    setStatus({ kind: win && win.closed ? "blocked" : "opened", url });
  };

  const field = (name: keyof QuoteRequest, label: string, control: ReactNode, required = false) => (
    <div className="field">
      <label htmlFor={`${uid}-${name}`}>
        {label}
        {required && (
          <span className="req" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {control}
      {errors[name] && (
        <span className="field-error" id={`${uid}-${name}-error`} role="alert">
          {errors[name]}
        </span>
      )}
    </div>
  );

  const a11y = (name: keyof QuoteRequest) => ({
    id: `${uid}-${name}`,
    name,
    value: values[name],
    onChange: update(name),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${uid}-${name}-error` : undefined,
  });

  return (
    <Reveal as="form" className="quote-form" delay={2} onSubmit={onSubmit} noValidate aria-label="Get a free sourcing quote">
      <h3>Get a free sourcing quote</h3>
      <div className="row2">
        {field(
          "name",
          "Your name",
          <input {...a11y("name")} required autoComplete="name" maxLength={LIMITS.name} placeholder="Full name" />,
          true,
        )}
        {field(
          "city",
          "City",
          <input {...a11y("city")} autoComplete="address-level2" maxLength={LIMITS.city} placeholder="e.g. Hyderabad" />,
        )}
      </div>
      {field(
        "category",
        "What do you want to import?",
        <select {...a11y("category")}>
          {QUOTE_CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>,
      )}
      <div className="row2">
        {field(
          "quantity",
          "Approx. quantity",
          <input {...a11y("quantity")} maxLength={LIMITS.quantity} placeholder="e.g. 1 container" />,
        )}
        {field(
          "budget",
          "Budget",
          <select {...a11y("budget")}>
            {QUOTE_BUDGETS.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>,
        )}
      </div>
      {field(
        "details",
        "Details",
        <textarea
          {...a11y("details")}
          required
          maxLength={LIMITS.details}
          placeholder="Product, specs, reference photos or links…"
        />,
        true,
      )}
      <button className="btn btn-primary btn-block" type="submit">
        Send on WhatsApp →
      </button>
      {status ? (
        <p className="form-status" role="status">
          {status.kind === "opened" ? (
            <>
              WhatsApp should now be open with your details filled in. Press <b>Send</b> there to reach us.{" "}
              <a href={status.url} target="_blank" rel="noopener noreferrer">
                Didn't open? Try again
              </a>
            </>
          ) : (
            <>
              Your browser blocked the new tab.{" "}
              <a href={status.url} target="_blank" rel="noopener noreferrer">
                Open WhatsApp with your details
              </a>
            </>
          )}
        </p>
      ) : (
        <p className="form-note">Opens WhatsApp with your details filled in. We usually reply within a few hours.</p>
      )}
    </Reveal>
  );
}
