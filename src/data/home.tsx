/**
 * Home page content, ported word for word from the ImportNow concept site.
 * Client stories are paraphrased from ImportNow's Instagram reels: replace with approved quotes before launch.
 */
import type { ReactNode } from "react";

export const HERO_STATS: { value: string; count?: number; suffix?: string; label: [string, string] }[] = [
  { value: "500", count: 500, suffix: "+", label: ["Businesses", "served"] },
  { value: "83", count: 83, suffix: "K+", label: ["Community on", "Instagram"] },
  { value: "1 pc", label: ["MOQ on many", "products"] },
  { value: "Shanghai", label: ["Own registered", "company"] },
];

export const MARQUEE_ROUTES: [string, string][] = [
  ["Yiwu", "Adilabad"],
  ["Foshan", "Hyderabad"],
  ["Shenzhen", "Siddipet"],
  ["Guangzhou", "Chennai"],
  ["Shanghai", "Nhava Sheva"],
  ["Guzhen", "Vizag"],
  ["Ningbo", "Mumbai"],
];

export interface Service {
  title: string;
  text: string;
  icon: ReactNode;
}

export const SERVICES: Service[] = [
  {
    title: "Product sourcing",
    text: "We find verified manufacturers across Yiwu, Guangzhou, Shenzhen and Foshan, and negotiate prices on your behalf.",
    icon: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3M8 11h6M11 8v6" />
      </>
    ),
  },
  {
    title: "Factory inspection",
    text: "Our team visits the factory in person. We check licences, samples and production capacity before you pay.",
    icon: (
      <>
        <path d="M3 21V9l6 4V9l6 4V5l6 4v12H3z" />
        <path d="M7 17h2M12 17h2M17 17h1" />
      </>
    ),
  },
  {
    title: "Quality control",
    text: "Pre-shipment checks with photo and video reports, done before the container is sealed.",
    icon: (
      <>
        <path d="M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6l8-3z" />
        <path d="M8.5 12l2.5 2.5 4.5-5" />
      </>
    ),
  },
  {
    title: "Shipping & logistics",
    text: "Full-container and shared-container sea freight from Chinese ports, plus air cargo for urgent orders.",
    icon: (
      <path d="M3 17l1.6 3.2c.2.4.6.8 1.1.8h12.6c.5 0 .9-.3 1.1-.8L21 17H3zM5 17V12h14v5M8 12V8h8v4M11 8V4h3v4M2 22c1.5-.8 3-.8 4.5 0s3 .8 4.5 0 3-.8 4.5 0 3 .8 4.5 0" />
    ),
  },
  {
    title: "Customs clearance",
    text: "Documentation, duties, GST and clearance at Indian ports. No surprises when the ship lands.",
    icon: (
      <>
        <path d="M7 3h7l5 5v13H7z" />
        <path d="M14 3v5h5M10 13h6M10 17h6" />
      </>
    ),
  },
  {
    title: "Doorstep delivery",
    text: "From the port straight to your shop, warehouse, villa or site, with the container unloaded on location.",
    icon: (
      <>
        <path d="M1 6h13v10H1zM14 10h4l4 3v3h-8z" />
        <circle cx="5.5" cy="18" r="2" />
        <circle cx="17.5" cy="18" r="2" />
      </>
    ),
  },
];

export const JOURNEY_STEPS: { title: string; text: string }[] = [
  {
    title: "Source the right factory",
    text: "Tell us the product. We shortlist verified manufacturers and get you real prices, not middleman quotes.",
  },
  { title: "Inspect & approve samples", text: "Our team visits the factory and checks samples. You approve over video call." },
  {
    title: "Quality check & loading",
    text: "Every carton is checked and counted. Then the cranes load your container onto the ship.",
  },
  { title: "Ocean freight", text: "Your container sails from Shanghai to India, and we track it the whole way." },
  {
    title: "Customs clearance",
    text: "Duties, GST and paperwork are handled at the Indian port, so the container is released quickly.",
  },
  { title: "Delivered to your door", text: "The container is unloaded and trucked to your shop, warehouse or site." },
];

const FURNITURE = <path d="M3 11h18v6H3zM5 17v3M19 17v3M5 11V7a2 2 0 012-2h10a2 2 0 012 2v4" />;
const CART = (
  <path d="M3 4h2l2.5 11h11L21 7H7M9 20a1 1 0 100-2 1 1 0 000 2zM18 20a1 1 0 100-2 1 1 0 000 2z" />
);

export interface ProductCategory {
  hub: string;
  title: string;
  points: string[];
  tag: string;
  art: ReactNode;
}

export const PRODUCTS: ProductCategory[] = [
  {
    hub: "Foshan hub",
    title: "Furniture & interiors",
    points: ["Complete home and villa furniture", "Office desks and executive chairs", "Banquet hall and hotel fit-outs"],
    tag: "Height-adjustable desk from ₹45,000 · MOQ 1",
    art: FURNITURE,
  },
  {
    hub: "Shenzhen hub",
    title: "Electronics & tech",
    points: ["LED screens and digital signage", "Mobile accessories in bulk", "Power bank rental kiosks"],
    tag: "Business ideas India doesn't have yet",
    art: (
      <>
        <rect x="6" y="2" width="12" height="20" rx="2" />
        <path d="M11 18h2" />
      </>
    ),
  },
  {
    hub: "Guangzhou hub",
    title: "EV & automotive",
    points: [
      "Electric scooters as kits for assembly in India",
      "Battery cells sourced separately",
      "Car LED lights with your own brand",
    ],
    tag: "Car LED private label · MOQ 500",
    art: (
      <>
        <circle cx="5.5" cy="17" r="3.5" />
        <circle cx="18.5" cy="17" r="3.5" />
        <path d="M5.5 17l4-8h5l4 8M9 6h3" />
      </>
    ),
  },
  {
    hub: "Guzhen hub",
    title: "Lighting",
    points: ["Decorative and architectural lighting", "Commercial LED fixtures", "Custom designs for projects"],
    tag: "Direct from the lighting capital of China",
    art: <path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.9V16h7v-2.1A6 6 0 0012 3z" />,
  },
  {
    hub: "Yiwu hub",
    title: "Supermarket & general goods",
    points: ["Complete store stock in one container", "Home, kitchen, toys and gifts", "Choose products over video call"],
    tag: "World's largest small-goods market",
    art: CART,
  },
  {
    hub: "Pan-China",
    title: "Machinery & automation",
    points: ["Production and packaging machines", "Smart vending and robotic kiosks", "Spares and after-sales support"],
    tag: "Tell us the machine, we find the factory",
    art: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
      </>
    ),
  },
];

export const SHANGHAI_POINTS: { strong: string; rest: string }[] = [
  { strong: "Registered business licence", rest: " issued in Shanghai, China" },
  { strong: "Chinese company bank account", rest: ", so payments to factories are safe and traceable" },
  { strong: "Team on the ground", rest: " for factory visits, quality checks and market trips" },
  { strong: "Indian founder on both sides", rest: ": talk to us in Telugu, Hindi or English" },
];

export const TRIP_PLACES = ["Guangzhou", "Shenzhen", "Yiwu", "Foshan", "Macau", "Glass bridge"];

export const TRIP_INCLUDES: { label: string; icon: ReactNode }[] = [
  {
    label: "Visa guidance & invitation letter",
    icon: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <path d="M8 8h8M8 12h8M8 16h5" />
      </>
    ),
  },
  { label: "Hotels close to the fair", icon: <path d="M3 21V8l9-5 9 5v13M9 21v-6h6v6" /> },
  { label: "Indian food daily, veg & non-veg", icon: <path d="M4 11h16a8 8 0 01-16 0zM12 3v4M8 5v2M16 5v2" /> },
  {
    label: "Guides & translators",
    icon: <path d="M4 5h9M8.5 3v2M6 5c0 4 3 7 6 8M11 5c-1 4-4 7-7 8M14 21l4-9 4 9M15.5 18h5" />,
  },
  { label: "Factory visits you choose", icon: <path d="M3 21V9l6 4V9l6 4V5l6 4v12H3z" /> },
  {
    label: "Sightseeing between markets",
    icon: (
      <>
        <path d="M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
  },
];

export const TRIP_DATES = [
  { season: "Spring", when: "Canton Fair · April–May" },
  { season: "Autumn", when: "Canton Fair · October–November" },
];

export interface WorkItem {
  title: string;
  text: string;
  route: string;
  meta: [string, string];
  tone: "ph1" | "ph2" | "ph3" | "ph4";
  art: ReactNode;
}

export const WORK: WorkItem[] = [
  {
    title: "Complete villa furniture",
    text: "Sofas, dining sets, office furniture and pergolas, all in one container delivered to a luxury villa.",
    route: "Foshan → Villa",
    meta: ["Full container", "Door delivery"],
    tone: "ph1",
    art: FURNITURE,
  },
  {
    title: "Sagar Supermarket",
    text: "Complete supermarket stock sourced from Yiwu over video calls and delivered to the client's warehouse.",
    route: "Yiwu → Adilabad",
    meta: ["Retail", "Video sourcing"],
    tone: "ph2",
    art: CART,
  },
  {
    title: "Sreeman Convention Centre",
    text: "Cots, beds, dining sets and office furniture for a convention venue, with better finish for the same budget.",
    route: "China → Convention",
    meta: ["Hospitality", "Bulk order"],
    tone: "ph3",
    art: <path d="M3 21V8l9-5 9 5v13M9 21v-6h6v6M7 10h2M15 10h2" />,
  },
  {
    title: "Smart office desks",
    text: "Motorised height-adjustable L-shaped desks, imported even as a single piece.",
    route: "China → Hyderabad",
    meta: ["MOQ 1", "~30 days"],
    tone: "ph4",
    art: <path d="M3 8h18v3H3zM5 11v9M19 11v9M10 8V5h4v3" />,
  },
];

export const STORIES = [
  {
    quote:
      "I came to source LED screens and electronics. The Guangzhou and Shenzhen markets were easy to navigate, and hotels, food and travel were all taken care of.",
    initials: "S",
    name: "Sai",
    role: "Ad-tech startup · Siddipet",
  },
  {
    quote:
      "Twelve days covering the Canton Fair and factories of my choice. Visa, guidance, Indian food every day. It felt like a personal trip, not a business tour.",
    initials: "M",
    name: "Mahender Reddy",
    role: "Canton Fair trip client",
  },
  {
    quote:
      "We picked our products on video calls, and the container came straight from Yiwu to our warehouse. The whole process was hassle-free.",
    initials: "SS",
    name: "Sagar Supermarket",
    role: "Retail · Adilabad",
  },
];

export const FAQS: { q: string; a: string }[] = [
  {
    q: "Can I import just one piece?",
    a: "Yes, for many products. Furniture like height-adjustable desks can be imported with a minimum order of one piece. Private-label products, such as car LED lights, usually start from around 500 units.",
  },
  {
    q: "How long does delivery take?",
    a: "Most sea shipments reach your door in about 30 to 40 days, depending on the product, the factory's production time and the destination port. Air cargo is faster for urgent orders.",
  },
  {
    q: "Do you handle customs and GST?",
    a: "Yes. We prepare the documentation and manage duties, GST and clearance at the Indian port, then deliver to your address.",
  },
  {
    q: "Do I need an Import Export Code (IEC)?",
    a: "For commercial imports, yes. If you don't have one yet, we'll guide you through getting it.",
  },
  {
    q: "Can I visit the factories myself?",
    a: "Absolutely. Join one of our guided China business trips, or we can arrange visits to the factories you've shortlisted.",
  },
  {
    q: "What's the best business to start by importing from China?",
    a: "It depends on your interests and budget. Popular choices with our clients include furniture, EV scooters, car accessories, lighting and supermarket goods. Talk to us and we'll suggest options that fit your market.",
  },
];
