import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Publish = () => {
  const Navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const handleMessageChange = (e: any) => {
    setMessage(e.target.value);
  };

  return (
    <div className="">
      <header className="bg-black py-3 px-4 md:px-8">
        <div className="container mx-auto flex items-center justify-between">
          <Link
            to={"/"}
            className="text-gray-50 text-lg md:text-2xl font-title"
          >
            @foxyfool/Medium
          </Link>

          <nav className="flex space-x-4">
            <div className="bg-white p-2 rounded-md ">
              <p className="text-black font-title">
                What's on your mind today?
              </p>
            </div>
          </nav>
        </div>
      </header>
      <div className="flex flex-col mt-4 mx-auto max-w-4xl">
        <label
          htmlFor="title"
          className="block mb-2 font-title text-2xl text-black"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          className="block p-2.5 w-full text-sm rounded-lg bg-slate-300 border"
          placeholder="Enter title"
          value={title}
          onChange={handleTitleChange}
        />
        <label
          htmlFor="message"
          className="block mt-4 mb-2 font-title text-2xl text-black"
        >
          Your message
        </label>
        <textarea
          id="message"
          rows={5}
          className="block p-2.5 w-full text-sm rounded-lg bg-slate-300 border"
          placeholder="Write your thoughts here..."
          value={message}
          onChange={handleMessageChange}
        ></textarea>
        <button
          onClick={async () => {
            try {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/blog`,
                {
                  title: title,
                  content: message,
                },
                {
                  headers: {
                    Authorization: localStorage.getItem("token") || "",
                  },
                }
              );
              console.log(response);
            } catch (error) {
              console.error(error);
            }
            Navigate(`/blogs`);
          }}
          className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-blue-600 transition-colors duration-300 font-title"
        >
          Publish Blog
        </button>
      </div>
    </div>
  );
};
