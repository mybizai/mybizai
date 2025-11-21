import { compareDesc } from "date-fns";

import { BlogPosts } from "~/components/blog/blog-posts";
import { allPosts } from ".contentlayer/generated";
import type { Post } from ".contentlayer/generated";

export const metadata = {
  title: "Blog",
};

export default function BlogPage() {
  const posts: Post[] = allPosts
    .filter((post) => post.published ?? true)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <main>
      <BlogPosts posts={posts} />
    </main>
  );
}
