/** Business contact details and site-wide navigation. */
export const PHONE_DISPLAY = "+91 99897 24320";
export const PHONE_TEL = "tel:+919989724320";
export const WHATSAPP_NUMBER = "919989724320";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const INSTAGRAM_URL = "https://www.instagram.com/importnow.in/";
export const INSTAGRAM_HANDLE = "@importnow.in";
export const CHINA_COMPANY = "Shanghai Shengqiao Chain Trading Co., Ltd.";

/** Ids of the home page sections, in page order. */
export type SectionId =
  | "home"
  | "services"
  | "journey"
  | "products"
  | "shanghai"
  | "trips"
  | "work"
  | "stories"
  | "guides"
  | "faq"
  | "contact";

export type NavItem = { label: string; section: SectionId } | { label: string; to: "/blog" };

export const NAV_LINKS: NavItem[] = [
  { label: "Services", section: "services" },
  { label: "How it works", section: "journey" },
  { label: "What we import", section: "products" },
  { label: "China trips", section: "trips" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", section: "contact" },
];
