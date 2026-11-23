import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/home/Contact";
import { Faq } from "@/components/home/Faq";
import { Hero } from "@/components/home/Hero";
import { Journey } from "@/components/home/Journey";
import { LatestGuides } from "@/components/home/LatestGuides";
import { Marquee, Products, Services, Shanghai, Stories, Trips, Work } from "@/components/home/Sections";

const TITLE = "ImportNow — Import Directly from China to India";
const DESCRIPTION =
  "End-to-end imports from China to India: product sourcing, factory inspection, shipping, customs clearance and doorstep delivery. Own company in Shanghai. Trusted by 500+ Indian businesses.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

/** Section order matches the reference site. */
function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Services />
      <Journey />
      <Products />
      <Shanghai />
      <Trips />
      <Work />
      <Stories />
      <LatestGuides />
      <Faq />
      <Contact />
    </>
  );
}
