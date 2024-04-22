import { Post } from "../hooks";
import { AppBar } from "./appbar";
import { Avatar } from "./blogcard";


export const BlogView = ({ post }: { post: Post }) => {



  return (
    <div>
      <AppBar />
      <div className="grid grid-cols-12 px-10 pt-10">
        <div className="bg-slate-300 col-span-8 p-6 rounded-2xl">
          <div className="text-3xl font-title mb-4">{post.title}</div>
          <div className="font-thin text-sm text-gray-500 mb-4">
            ON : 02.04.24
          </div>
          <div>{post.content}</div>
        </div>
        <div className="bg-green-100 col-span-4 flex flex-col justify-center items-center p-6 rounded-r-2xl">
          <div className="text-xl font-semibold mb-4">
            {post.author.name || "Anonymous"}
          </div>
          <div className="flex items-center">
            <Avatar name={post.author.name || "Anonumous"} />
            <div className="ml-2">
              <div className="text-sm font-medium">
                Share your knowledge, share your growth.
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
