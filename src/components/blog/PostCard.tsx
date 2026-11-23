import { Link } from "@tanstack/react-router";
import { Flag, Icon } from "@/components/icons/Sprite";
import type { Post } from "@/data/posts";
import { formatPostDate } from "@/lib/blog";
import { Reveal } from "@/components/site/Reveal";

/** Illustrated cover: gradient tone + category icon, generated from the post's data (no image files needed). */
export function PostCover({ post, compact = false }: { post: Post; compact?: boolean }) {
  return (
    <span className="cover-in">
      <span className={`cv-bg ${post.tone}`} />
      <Icon name={`ic-${post.icon}`} className="cv-ic" />
      <span className="cv-cat">{post.category}</span>
      <span className="cv-flags">
        <Flag country="cn" />→<Flag country="in" />
      </span>
      {!compact && <span className="cv-title">{post.title.split(":")[0]}</span>}
    </span>
  );
}

export function PostMeta({ post, byline = false }: { post: Post; byline?: boolean }) {
  return (
    <div className="post-meta">
      <time dateTime={post.date}>{formatPostDate(post.date)}</time>
      <span className="dot" />
      <span>{post.minutes} min read</span>
      {byline && (
        <>
          <span className="dot" />
          <span>By ImportNow Team</span>
        </>
      )}
    </div>
  );
}

export function PostCard({ post, index = 0 }: { post: Post; index?: number }) {
  const params = { slug: post.slug };
  return (
    <Reveal as="article" className="post-card" delay={((index % 2) + 1) as 1 | 2}>
      <Link to="/blog/$slug" params={params} className="cover" aria-hidden="true" tabIndex={-1}>
        <PostCover post={post} />
      </Link>
      <div className="bd">
        <h3>
          <Link to="/blog/$slug" params={params}>
            {post.title}
          </Link>
        </h3>
        <PostMeta post={post} />
        <p>{post.excerpt}</p>
        <Link to="/blog/$slug" params={params} className="read-more" aria-label={`Read more: ${post.title}`}>
          Read more <span aria-hidden="true">→</span>
        </Link>
      </div>
    </Reveal>
  );
}
