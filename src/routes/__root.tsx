import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SvgSprite } from "@/components/icons/Sprite";
import { MotionEffects } from "@/components/site/MotionEffects";
import { SiteFooter, WhatsAppButton } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

function NotFoundComponent() {
  return (
    <section className="nf">
      <div>
        <b>404</b>
        <h1>This page didn't make the shipment.</h1>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <div className="hero-btns">
          <Link to="/" className="btn btn-primary">
            Back to home →
          </Link>
          <Link to="/blog" className="btn btn-ghost">
            Read import guides
          </Link>
        </div>
      </div>
    </section>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <section className="nf">
      <div>
        <h1>This page didn't load</h1>
        <p>Something went wrong on our end. You can try again or head back home.</p>
        <div className="hero-btns">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Try again
          </button>
          <a href="/" className="btn btn-ghost">
            Go home
          </a>
        </div>
      </div>
    </section>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    // Defaults only: every page sets its own title, description and social tags.
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#ffffff" },
      { title: "ImportNow — Import Directly from China to India" },
      {
        name: "description",
        content:
          "End-to-end imports from China to India: product sourcing, factory inspection, shipping, customs clearance and doorstep delivery.",
      },
      { name: "author", content: "ImportNow" },
      { property: "og:site_name", content: "ImportNow" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap",
      },
      { rel: "preconnect", href: "https://cdn.jsdelivr.net", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <SvgSprite />
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        {/* Required: nested routes render here. */}
        <Outlet />
      </main>
      <SiteFooter />
      <WhatsAppButton />
      <MotionEffects />
    </QueryClientProvider>
  );
}

