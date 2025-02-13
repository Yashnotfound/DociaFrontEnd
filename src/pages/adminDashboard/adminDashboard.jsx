import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch documents from the backend
  useEffect(() => {
    axios.get("http://localhost:5173/documents/")
      .then((response) => {
        setDocuments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to fetch documents");
      });
  }, []);

  // Handle Approve/Reject action
  const handleAction = (id, status) => {
    const comment = prompt(`Add a comment for ${status.toLowerCase()}ing this document:`);

    if (!comment) return;

    axios.put(`http://localhost:5000/documents/${id}`, { status, comments: comment })
      .then((response) => {
        toast.success(`Document ${status.toLowerCase()}ed successfully`);
        setDocuments((prevDocs) =>
          prevDocs.map((doc) =>
            doc._id === id ? { ...doc, status, comments: comment } : doc
          )
        );
      })
      .catch((error) => {
        console.error(error);
        toast.error(`Failed to ${status.toLowerCase()} document`);
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="App">
      <h1>Admin Dashboard</h1>
      <ToastContainer />
      
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc) => (
            <tr key={doc._id}>
              <td>{doc.title}</td>
              <td>{doc.description}</td>
              <td>{doc.status}</td>
              <td>{doc.comments || "No comments"}</td>
              <td>
                {doc.status === "Pending" && (
                  <>
                    <button onClick={() => handleAction(doc._id, "Approved")}>Approve</button>
                    <button onClick={() => handleAction(doc._id, "Rejected")}>Reject</button>
                  </>
                )}
                {doc.status !== "Pending" && <span>Action Completed</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
