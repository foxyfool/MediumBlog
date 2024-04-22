import { useBlog } from "../hooks";
import { BlogView } from "../components/blogview";
import { useParams } from "react-router-dom";
import { Delete } from "./delete";
import { BlogSkeleton } from "./blogskeleton";

import { AppBar } from "../components/appbar";

export const Blog = () => {
  const { id } = useParams();

  const { loading, post } = useBlog({
    id: id || "",
  });

  if (loading || !post) {
    return (
      <div>
        <AppBar />
        <BlogSkeleton />
      </div>
    );
  }
  return (
    <div className="">
      <BlogView post={post} />
      <div className="flex items-center justify-center">
        <Delete />
      </div>
    </div>
  );
};
