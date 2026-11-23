import { describe, expect, it } from "vitest";
import { POSTS } from "@/data/posts";
import { filterPosts, getRelated, paginate, prepareArticle } from "@/lib/blog";
import { dayAt, routeProgress, stepAt } from "@/lib/three/voyageTimeline";

describe("blog listing", () => {
  it("shows 6 articles per page", () => {
    const first = paginate(POSTS, 1);
    expect(first.items).toHaveLength(6);
    expect(first.pageCount).toBe(2);
    expect(paginate(POSTS, 2).items).toHaveLength(POSTS.length - 6);
  });

  it("filters by category", () => {
    const list = filterPosts(POSTS, "Business ideas", "");
    expect(list.map((p) => p.slug)).toEqual(["ev-scooter-business-ckd-kits", "private-label-car-led-business"]);
  });

  it("searches title and excerpt, case-insensitively", () => {
    expect(filterPosts(POSTS, "All", "CANTON").map((p) => p.slug)).toContain("canton-fair-guide-for-indian-businesses");
    expect(filterPosts(POSTS, "All", "zzz-no-match")).toHaveLength(0);
  });

  it("lists same-category articles first in related", () => {
    const post = POSTS.find((p) => p.slug === "how-to-import-from-china-to-india")!;
    expect(getRelated(post)[0]?.slug).toBe("how-to-verify-a-chinese-supplier");
  });

  it("adds anchors to article headings for the table of contents", () => {
    const { html, toc } = prepareArticle("<h2>One &amp; two</h2><p>x</p><h2>Three</h2>");
    expect(toc).toEqual([
      { id: "s1", title: "One & two" },
      { id: "s2", title: "Three" },
    ]);
    expect(html).toContain('<h2 id="s2">Three</h2>');
  });
});

describe("voyage timeline", () => {
  it("runs from day 0 in Shanghai to day 35 at the door", () => {
    expect(dayAt(0)).toBe(0);
    expect(dayAt(1)).toBe(35);
    expect(routeProgress(0.2)).toBe(0);
    expect(routeProgress(0.9)).toBe(1);
  });

  it("activates the six steps in order", () => {
    expect(stepAt(0)).toBe(0);
    expect(stepAt(0.5)).toBe(3);
    expect(stepAt(1)).toBe(5);
  });
});
