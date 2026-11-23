import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { PostCard } from "@/components/blog/PostCard";
import { SearchIcon } from "@/components/icons/LineIcon";
import { SplitText } from "@/components/site/SplitText";
import { POSTS } from "@/data/posts";
import { ALL_CATEGORIES, filterPosts, getCategories, paginate } from "@/lib/blog";

const TITLE = "Import Guides & Blogs | ImportNow";
const DESCRIPTION =
  "Practical guides on importing from China to India: sourcing, wholesale markets, shipping, customs duty and business ideas.";

export const Route = createFileRoute("/blog/")({
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
  component: BlogPage,
});

const CATEGORIES = getCategories();

function BlogPage() {
  const [category, setCategory] = useState(ALL_CATEGORIES);
  const [term, setTerm] = useState("");
  const [page, setPage] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => filterPosts(POSTS, category, term), [category, term]);
  const { items, page: current, pageCount } = paginate(filtered, page);

  const goToPage = (n: number) => {
    setPage(n);
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Blog</span>
          </nav>
          <SplitText as="h1">
            <span className="grad-blue">
              Import Guides <em>&amp;</em> Blogs
            </span>
          </SplitText>
          <p>
            Everything we've learned from hundreds of shipments: sourcing in China, choosing markets, shipping, customs
            and business ideas for India.
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="wrap">
          <div className="blog-tools" ref={topRef}>
            <div className="cats" role="group" aria-label="Filter by category">
              {CATEGORIES.map((c) => (
                <button
                  type="button"
                  key={c}
                  className={`cat-btn${c === category ? " on" : ""}`}
                  aria-pressed={c === category}
                  onClick={() => {
                    setCategory(c);
                    setPage(1);
                  }}
                >
                  {c}
                </button>
              ))}
            </div>
            <label className="search">
              <SearchIcon />
              <input
                type="search"
                placeholder="Search articles"
                aria-label="Search articles"
                value={term}
                onChange={(e) => {
                  setTerm(e.target.value);
                  setPage(1);
                }}
              />
            </label>
          </div>

          <div className="post-grid" aria-live="polite">
            {items.length ? (
              items.map((p, i) => <PostCard post={p} index={i} key={p.slug} />)
            ) : (
              <div className="empty">
                No articles match “{term}”{category !== ALL_CATEGORIES && ` in ${category}`}.
              </div>
            )}
          </div>

          {pageCount > 1 && (
            <nav className="pager" aria-label="Pages">
              {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                <button
                  type="button"
                  key={n}
                  className={n === current ? "on" : ""}
                  aria-label={`Page ${n}`}
                  aria-current={n === current ? "page" : undefined}
                  onClick={() => goToPage(n)}
                >
                  {n}
                </button>
              ))}
            </nav>
          )}
        </div>
      </section>
    </>
  );
}
