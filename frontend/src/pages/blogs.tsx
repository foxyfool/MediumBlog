import { BlogCard } from "../components/blogcard";
import { AppBar } from "../components/appbar";
import { useBlogs } from "../hooks";
import { BlogSkeleton } from "./blogskeleton";

export const Blogs = () => {
  const { loading, posts } = useBlogs();

  if (loading) {
    return (
      <div>
        <AppBar />
        <BlogSkeleton />
      </div>
    );
  }

  return (
    <div className="">
      <AppBar />
      <div className="space-y-5 flex flex-col w-12/12">
        {posts.map((post) => (
          <BlogCard
            id={post.id}
            key={post.id} // Use post.id as the key
            authorName={post.author.name || "Name Not Provided"} // Assuming authorName is part of your blog data
            title={post.title}
            content={post.content}
            publishedDate={"2.04.24"}
          />
        ))}
      </div>
    </div>
  );
};
