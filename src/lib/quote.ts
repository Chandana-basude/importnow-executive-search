import { WHATSAPP_NUMBER } from "@/data/site";

export const QUOTE_CATEGORIES = [
  "Furniture & interiors",
  "Electronics & tech",
  "EV & automotive",
  "Lighting",
  "Supermarket & general goods",
  "Machinery",
  "China business trip / Canton Fair",
  "Something else",
] as const;

export const QUOTE_BUDGETS = ["Under ₹1 lakh", "₹1–5 lakh", "₹5–25 lakh", "₹25 lakh+"] as const;

export interface QuoteRequest {
  name: string;
  city: string;
  category: string;
  quantity: string;
  budget: string;
  details: string;
}

export type QuoteErrors = Partial<Record<keyof QuoteRequest, string>>;

export const LIMITS = { name: 80, city: 60, quantity: 60, details: 1000 } as const;

/** Returns one message per invalid field; an empty object means the request can be sent. */
export function validateQuote(q: QuoteRequest): QuoteErrors {
  const errors: QuoteErrors = {};
  const name = q.name.trim();
  if (!name) errors.name = "Please enter your name.";
  else if (name.length < 2) errors.name = "Name must be at least 2 characters.";
  else if (name.length > LIMITS.name) errors.name = `Name must be under ${LIMITS.name} characters.`;

  if (q.city.trim().length > LIMITS.city) errors.city = `City must be under ${LIMITS.city} characters.`;
  if (q.quantity.trim().length > LIMITS.quantity)
    errors.quantity = `Quantity must be under ${LIMITS.quantity} characters.`;

  if (!(QUOTE_CATEGORIES as readonly string[]).includes(q.category))
    errors.category = "Please choose what you want to import.";
  if (!(QUOTE_BUDGETS as readonly string[]).includes(q.budget)) errors.budget = "Please choose a budget.";

  const details = q.details.trim();
  if (!details) errors.details = "Tell us a little about the product.";
  else if (details.length < 10) errors.details = "Please add a few more details (at least 10 characters).";
  else if (details.length > LIMITS.details)
    errors.details = `Details must be under ${LIMITS.details} characters.`;
  return errors;
}

export function buildQuoteMessage(q: QuoteRequest): string {
  const v = (s: string) => s.trim() || "-";
  return [
    "Hi ImportNow, I'd like a sourcing quote.",
    "",
    `Name: ${v(q.name)}`,
    `City: ${v(q.city)}`,
    `Category: ${v(q.category)}`,
    `Quantity: ${v(q.quantity)}`,
    `Budget: ${v(q.budget)}`,
    `Details: ${v(q.details)}`,
  ].join("\n");
}

export function buildWhatsAppUrl(q: QuoteRequest): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildQuoteMessage(q))}`;
}
