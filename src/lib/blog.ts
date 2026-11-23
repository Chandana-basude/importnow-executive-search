import { POSTS, type Post } from "@/data/posts";

export const POSTS_PER_PAGE = 6;
export const ALL_CATEGORIES = "All";

export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getCategories(posts: Post[] = POSTS): string[] {
  return [ALL_CATEGORIES, ...new Set(posts.map((p) => p.category))];
}

export function filterPosts(posts: Post[], category: string, term: string): Post[] {
  const q = term.trim().toLowerCase();
  return posts.filter(
    (p) =>
      (category === ALL_CATEGORIES || p.category === category) &&
      (!q || `${p.title} ${p.excerpt} ${p.category}`.toLowerCase().includes(q)),
  );
}

export function paginate<T>(items: T[], page: number, perPage = POSTS_PER_PAGE) {
  const pageCount = Math.max(1, Math.ceil(items.length / perPage));
  const current = Math.min(Math.max(1, page), pageCount);
  return { items: items.slice((current - 1) * perPage, current * perPage), page: current, pageCount };
}

/** Same-category articles first, then the newest of the rest. */
export function getRelated(post: Post, count = 3): Post[] {
  const others = POSTS.filter((p) => p.slug !== post.slug);
  return [...others.filter((p) => p.category === post.category), ...others.filter((p) => p.category !== post.category)].slice(0, count);
}

export interface TocEntry {
  id: string;
  title: string;
}

/** Gives every <h2> in the article body an anchor id and returns the table of contents. */
export function prepareArticle(body: string): { html: string; toc: TocEntry[] } {
  const toc: TocEntry[] = [];
  const html = body.replace(/<h2>(.*?)<\/h2>/g, (_m, inner: string) => {
    const id = `s${toc.length + 1}`;
    toc.push({ id, title: inner.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&") });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  return { html, toc };
}
