import { Link } from "@tanstack/react-router";
import { PostCard } from "@/components/blog/PostCard";
import { SplitText } from "@/components/site/SplitText";
import { POSTS } from "@/data/posts";
import { Reveal } from "@/components/site/Reveal";

export function LatestGuides() {
  return (
    <section className="section tight" id="guides">
      <div className="wrap">
        <div className="section-head with-action">
          <div>
            <Reveal as="span" className="eyebrow">Import guides</Reveal>
            <SplitText className="d1">Learn before you import.</SplitText>
            <Reveal as="p" delay={2}>Practical guides on sourcing, shipping, customs and business ideas from China.</Reveal>
          </div>
          <Reveal>
            <Link to="/blog" className="btn btn-ghost">
              View all articles →
            </Link>
          </Reveal>
        </div>
        <div className="post-grid three">
          {POSTS.slice(0, 3).map((p, i) => (
            <PostCard post={p} index={i} key={p.slug} />
          ))}
        </div>
      </div>
    </section>
  );
}
