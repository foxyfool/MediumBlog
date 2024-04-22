import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface Post {
  id: number;
  title: string;
  content: string;
  author: {
    name: string;
  };
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<Post>();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: token, // Ensure token is a string
        },
      })
      .then((response) => {
        setPost(response.data.post);
        setLoading(false);
        console.log(response.data.post); // Log the updated post here
      })
      .catch((error) => {
        console.log("Error fetching blog post", error.response.data.message);
      });
    

  }, [id]);

  return { loading, post };
};

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: token, // Ensure token is a string
        },
      })
      .then((response) => {
        setPosts(response.data.posts);
        console.log(response.data.posts);
        console.log(response.data.posts[0].id);
        setLoading(false);
      });
    console.log(posts);
  }, []);

  return { loading, posts };
};
