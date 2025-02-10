import { Link } from "react-router-dom";

export const DocCard = ({ title, documents }) => (
    <section className="py-10 px-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
      {documents.length === 0 ? (
        <p className="text-gray-600">No documents available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((doc) => (
            <div key={doc.id} className="bg-white rounded-md shadow-md p-4 hover:shadow-lg transition">
              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{doc.title}</h3>
              {/* Description */}
              <p className="text-sm text-gray-600 mb-2">{doc.description}</p>
              {/* Author */}
              <p className="text-xs text-gray-500 mb-2">By {doc.author}</p>
              {/*CreatedAt */}
              <p className="text-xs text-gray-500 mb-2">Created At: {new Date(doc.createdAt).toDateString()}</p>
              {/* Read More Link */}
              <Link to={`/document/${doc.id}`} className="text-blue-600 hover:underline">
                Read More →
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );