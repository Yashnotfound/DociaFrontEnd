import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../../App";
import { DocCard } from "./components/docCard.component";

const Homepage = () => {
  const [generalDocs, setGeneralDocs] = useState([]);
  const [apiDocs, setApiDocs] = useState([]);
  const [yourDocs, setYourDocs] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    userAuth: { accessToken, username },
  } = useContext(UserContext);

  // Fetch documents for all sections
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [generalRes, apiRes] = await Promise.all([
          axios.get("http://localhost:8080/api/documents/find?type=GENERAL"),
          axios.get("http://localhost:8080/api/documents/find?type=API_CONTRACT"),
        ]);

        setGeneralDocs(generalRes.data);
        setApiDocs(apiRes.data);

        if (accessToken && username) {
          const yourRes = await axios.get(
            `http://localhost:8080/api/documents/find?auther=${username}`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
          );
          setYourDocs(yourRes.data);
        }

        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load documents.");
      }
    };

    fetchData();
  }, [accessToken, username]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <>
      <Toaster />
      <header className="bg-gray-100 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Docia</h1>
        <p className="text-lg text-gray-600">Manage your documents with ease.</p>
      </header>
      <DocCard title="General Documents" documents={generalDocs} />
      <DocCard title="API Documents" documents={apiDocs} />
      {accessToken && <DocCard title="Your Documents" documents={yourDocs} />}
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p> {new Date().getFullYear()} Docia</p>
      </footer>
    </>
  );
};

export default Homepage;
