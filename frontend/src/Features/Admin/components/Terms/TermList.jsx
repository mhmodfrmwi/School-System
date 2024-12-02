import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTerm, fetchTerms, editTermAsync } from "../AdminRedux/termSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import TermHeader from "./TermHeader"; // Import the TermHeader component

const TermList = () => {
  const { terms, status, message } = useSelector((state) => state.terms);
  const dispatch = useDispatch();

  // State for managing the term being edited
  const [editingTerm, setEditingTerm] = useState(null);
  const [termData, setTermData] = useState({
    name: "",
    year: "",
  });

  useEffect(() => {
    dispatch(fetchTerms());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this term?")) {
      dispatch(removeTerm(id)); // Call the removeTerm action to delete the term
    }
  };

  const handleEditClick = (term) => {
    setEditingTerm(term.id); // Set the term ID to indicate we're in edit mode
    setTermData({
      name: term.name,
      year: term.year,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setTermData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedTerm = {
      name: termData.name,
      year: termData.year,
    };
    dispatch(editTermAsync({ id: editingTerm, updatedTerm }));
    setEditingTerm(null); // Close the edit form
  };

  if (status === "loading") {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (status === "failed") {
    return <div className="text-center text-red-500">Error: {message}</div>;
  }

  if (!Array.isArray(terms) || terms.length === 0) {
    return <div className="text-center text-gray-500">No terms found</div>;
  }

  return (
    <div className="mx-auto px-4 lg:px-0">
      <TermHeader /> {/* Include TermHeader component */}

      {message && (
        <div className="mb-4 mt-6 rounded-lg border-l-4 border-green-500 bg-green-100 p-3 text-green-800 shadow-md">
          {message}
        </div>
      )}

      <div className="space-y-4 p-4">
        {terms.map((term) => (
          <div
            key={term.id}
            className="flex items-center bg-white border border-gray-200 rounded-lg shadow-md p-4"
          >
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faPen} className="text-green-500 text-xl" />
            </div>

            <div className="ml-4 flex-grow">
              <p className="text-gray-500 text-sm">{term.year}</p>
              <h3 className="text-lg font-semibold">{term.name}</h3>
            </div>

            <div className="flex items-center space-x-2">
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => handleEditClick(term)} // Handle edit button click
                title="Edit"
              >
                <FontAwesomeIcon icon={faPen} />
              </button>
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleDelete(term.id)}
                title="Delete"
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        ))}

        {/* Edit Form */}
        {editingTerm && (
          <form onSubmit={handleEditSubmit} className="mt-4 p-4 bg-white border rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">Edit Term</h3>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">Term Name</label>
              <input
                type="text"
                name="name"
                value={termData.name}
                onChange={handleEditChange}
                className="mt-1 p-2 border rounded-md w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">Year</label>
              <input
                type="text"
                name="year"
                value={termData.year}
                onChange={handleEditChange}
                className="mt-1 p-2 border rounded-md w-full"
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="text-gray-500"
                onClick={() => setEditingTerm(null)} // Close edit form without saving
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Save Changes
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default TermList;
