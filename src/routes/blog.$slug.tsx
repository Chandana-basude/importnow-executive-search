import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PostCard, PostCover, PostMeta } from "@/components/blog/PostCard";
import { SectionLink } from "@/components/site/SectionLink";
import { SplitText } from "@/components/site/SplitText";
import { POSTS } from "@/data/posts";
import { formatPostDate, getPost, getRelated, prepareArticle } from "@/lib/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) {
      return { meta: [{ title: "Article not found | ImportNow" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${post.title} | ImportNow`;
    return {
      meta: [
        { title },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { property: "article:published_time", content: post.date },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ArticlePage,
});

function ArticlePage() {
  const { post } = Route.useLoaderData();
  const { html, toc } = prepareArticle(post.body);
  const popular = POSTS.filter((p) => p.slug !== post.slug).slice(0, 5);
  const related = getRelated(post);

  // Share links need the full page address, which only exists in the browser.
  const [pageUrl, setPageUrl] = useState("");
  useEffect(() => setPageUrl(window.location.href.split("#")[0] ?? ""), [post.slug]);
  const url = encodeURIComponent(pageUrl);
  const text = encodeURIComponent(post.title);

  return (
    <>
      <div className="wrap article-wrap">
        <article className="article">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true">/</span>
            <Link to="/blog">Blog</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{post.category}</span>
          </nav>
          <SplitText as="h1" key={post.slug}>
            {post.title}
          </SplitText>
          <PostMeta post={post} byline />
          <div className="cover">
            <PostCover post={post} />
          </div>
          {toc.length > 3 && (
            <nav className="toc" aria-label="In this article">
              <b>In this article</b>
              <ol>
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`}>{t.title}</a>
                  </li>
                ))}
              </ol>
            </nav>
          )}
          {/* Trusted, hand-written article HTML from src/data/posts.ts */}
          <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
          <div className="share">
            Share:
            <a href={`https://wa.me/?text=${text}%20${url}`} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href={`https://twitter.com/intent/tweet?text=${text}&url=${url}`} target="_blank" rel="noopener noreferrer">
              X
            </a>
          </div>
        </article>

        <aside className="sidebar">
          <div className="side-box">
            <h3>Popular Articles</h3>
            <div>
              {popular.map((p) => (
                <Link className="pop" to="/blog/$slug" params={{ slug: p.slug }} key={p.slug}>
                  <span className="cover">
                    <PostCover post={p} compact />
                  </span>
                  <span>
                    <b>{p.title}</b>
                    <span>{formatPostDate(p.date)}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <div className="side-cta">
            <h3>Planning an import?</h3>
            <p>Tell us the product and quantity. We'll send supplier options, landed cost and timelines, free of charge.</p>
            <SectionLink section="contact" className="btn">
              Get a free quote →
            </SectionLink>
          </div>
        </aside>
      </div>

      <section className="related">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Keep reading</span>
            <h2>Related articles</h2>
          </div>
          <div className="post-grid">
            {related.map((p, i) => (
              <PostCard post={p} index={i} key={p.slug} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
