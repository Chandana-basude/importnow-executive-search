import { describe, expect, it } from "vitest";
import { buildQuoteMessage, buildWhatsAppUrl, validateQuote, type QuoteRequest } from "@/lib/quote";

const valid: QuoteRequest = {
  name: "Ravi Kumar",
  city: "Hyderabad",
  category: "Lighting",
  quantity: "1 container",
  budget: "₹5–25 lakh",
  details: "Decorative LED ceiling lights for a showroom",
};

describe("quote form validation", () => {
  it("accepts a complete request", () => {
    expect(validateQuote(valid)).toEqual({});
  });

  it("requires a name", () => {
    expect(validateQuote({ ...valid, name: "   " }).name).toBeDefined();
  });

  it("requires product details of at least 10 characters", () => {
    expect(validateQuote({ ...valid, details: "" }).details).toBeDefined();
    expect(validateQuote({ ...valid, details: "LED light" }).details).toBeDefined();
    expect(validateQuote({ ...valid, details: "LED lights" }).details).toBeUndefined();
  });

  it("keeps city and quantity optional", () => {
    expect(validateQuote({ ...valid, city: "", quantity: "" })).toEqual({});
  });

  it("rejects a category that is not offered", () => {
    expect(validateQuote({ ...valid, category: "Weapons" }).category).toBeDefined();
  });
});

describe("WhatsApp hand-off", () => {
  it("sends the request to ImportNow's WhatsApp number with every field", () => {
    const url = buildWhatsAppUrl(valid);
    expect(url.startsWith("https://wa.me/919989724320?text=")).toBe(true);
    const text = decodeURIComponent(url.split("?text=")[1] ?? "");
    expect(text).toBe(buildQuoteMessage(valid));
    expect(text).toContain("Name: Ravi Kumar");
    expect(text).toContain("Budget: ₹5–25 lakh");
  });
});
