import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import MarkdownPreview from "@uiw/react-markdown-preview";

const ViewDocument = () => {
  const { id } = useParams();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/documents/${id}`);
        setDocument(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load document.");
      }
    };

    fetchDocument();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (!document) return <div className="text-center mt-10">Document not found.</div>;

  return (
    <>
      <Toaster />
      <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{document.title}</h1>
        <p className="text-lg text-gray-600 mb-4">{document.description}</p>
        <p className="text-sm text-gray-500 mb-2">By {document.author}</p>
        <p className="text-sm text-gray-500 mb-2">
          Created on: {new Date(document.createdAt).toLocaleDateString()}
        </p>
        <div className="mt-6">
          <MarkdownPreview source={document.content} className="bg-transparent text-black" />
        </div>
      </div>
    </>
  );
};

export default ViewDocument;