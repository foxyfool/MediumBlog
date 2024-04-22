import { useBlog } from "../hooks";
import { BlogView } from "../components/blogview";

import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export const Delete = () => {
  const { id } = useParams();
  console.log("postId:", id); // Add this line
  const navigate = useNavigate();

  // State to manage modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleDeletePost = async () => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"), // Include the token in the Authorization header
        },
      });

      if (response.status === 200) {
        // Post deleted successfully
        navigate("/blogs"); // Navigate to /blogs
      } else {
        // Handle error
        console.error("Error deleting post:", response.data.message);
      }
    } catch (error) {
      // Handle error
      console.error("Error deleting post:", error);
    }
  };
  return (
    <div>
      {/* Delete button with modal trigger */}
      <button
        className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-red-600 transition-colors duration-300 font-title"
        onClick={openModal} // Open modal on button click
      >
        Delete Blog
      </button>
      {/* Confirmation modal */}
      {isModalOpen && (
        <ConfirmModal
          message="Are you sure you want to delete this post?"
          onConfirm={() => {
            handleDeletePost();
            closeModal(); // Close modal after confirming
          }}
          onCancel={closeModal} // Close modal if canceled
        />
      )}
    </div>
  );
};

interface ConfirmModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-8">
        <p className="text-lg mb-4">{message}</p>
        <div className="flex justify-end">
          <button
            className="mr-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors duration-300"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-300"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
