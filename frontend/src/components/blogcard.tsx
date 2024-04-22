import { Link } from "react-router-dom";

interface BlogCardProps {
  id: number;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`} className="text-black">
      <div className="bg-gray-100 p-7 rounded cursor-pointer hover:bg-gray-200 transition duration-300">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar name={authorName} />
          <div>
            <div className="font-semibold">{authorName}</div>
            <div className="text-gray-500">{publishedDate}</div>
          </div>
        </div>
        <div>
          <div className="font-bold text-lg text-gray-800 mb-2">{title}</div>
          <div className="text-gray-700">{content.slice(0, 200) + "..."}</div>
          <div className="text-gray-500 text-sm mt-2">{`${Math.ceil(
            content.length / 200
          )} min read`}</div>
        </div>
      </div>
    </Link>
  );
};

export function Avatar({ name }: { name: string }) {
  return (
    <div className="relative flex-shrink-0 w-10 h-10 bg-gray-300 rounded-full overflow-hidden">
      <span className="absolute inset-0 flex items-center justify-center text-gray-600 text-sm font-medium">
        {name[0].toUpperCase()}
      </span>
    </div>
  );
}
