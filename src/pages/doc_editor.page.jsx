import React, { useState, useContext } from "react";
import { UserContext } from "../App";
import axios from "axios";
import MDEditor from "@uiw/react-md-editor";
import { Navigate, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Editor = () => {
  const {
    userAuth: { accessToken },
  } = useContext(UserContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate(); // React Router's navigation hook

  // Function to handle publishing the document
  const handlePublish = async () => {
    if (!title || !content) {
      toast.error("Title and content are required!");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8080/api/documents",
        {
          title,
          content, // Save markdown directly
          type: "GENERAL",
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      toast.success("Document saved successfully!");

      setTimeout(()=>{
        navigate("/"); // Redirect to home page
      },2000);

    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to save the document."
      );
    }
  };

  // Redirect to login if not authenticated
  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {/* Toast Container */}
      <Toaster />

      {/* Navbar */}
      <nav className="navbar bg-white shadow-md p-4 flex items-center">
        <p className="max-md:hidden text-black blog-title line-clamp-1 w-full">
          {title.length ? title : "New Blog"}
        </p>

        <div className="flex gap-4 ml-auto">
          <button
            className="btn-dark py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            onClick={handlePublish}
          >
            Publish
          </button>
        </div>
      </nav>

      {/* Editor Section */}
      <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
        <h1 className="text-4xl text-dark-grey font-bold text-center mb-6">
          New Document
        </h1>

        {/* Title Input */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter document title"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        {/* Markdown Editor */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Content
          </label>
          <MDEditor value={content} onChange={setContent} height={400} />
        </div>
      </div>
    </>
  );
};

export default Editor;
