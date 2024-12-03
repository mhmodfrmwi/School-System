import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeTerm,
  fetchTerms,
  editTermAsync,
  clearMessage,
} from "../AdminRedux/termSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import TermHeader from "../Terms/TermHeader";

const TermList = () => {
  const { terms, status, message } = useSelector((state) => state.terms);
  const dispatch = useDispatch();

  const [editingTerm, setEditingTerm] = useState(null);
  const [termData, setTermData] = useState({
    name: "",
    from: "",
    to: "",
  });
  const [displayMessage, setDisplayMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noTermsFound, setNoTermsFound] = useState(false);

  // Fetch terms on component load
  useEffect(() => {
    dispatch(fetchTerms());
    return () => {
      dispatch(clearMessage());
    };
  }, [dispatch]);

  // Handle message display and auto hide after 5 seconds
  useEffect(() => {
    if (message) {
      setDisplayMessage(message);

      const timer = setTimeout(() => {
        setDisplayMessage("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  // Handle empty terms message
  useEffect(() => {
    if (terms.length === 0) {
      setNoTermsFound(true);
    } else {
      setNoTermsFound(false);
    }
  }, [terms]);

  // Handle term deletion
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this term?")) {
      dispatch(removeTerm(id))
        .unwrap()
        .then(() => {
          setDisplayMessage("Term deleted successfully.");
        })
        .catch((error) => {
          setDisplayMessage(error);
        });
    }
  };

  // Set term for editing and open modal
  const handleEditClick = (term) => {
    setEditingTerm(term.id);
    setTermData({
      name: term.name,
      from: term.from,
      to: term.to,
    });
    setIsModalOpen(true); // Open modal
    setDisplayMessage(""); // Clear any previous messages
  };

  // Handle input changes for editing
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setTermData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission for updating a term
  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedTerm = {
      name: termData.name,
      from: termData.from,
      to: termData.to,
    };
    dispatch(editTermAsync({ id: editingTerm, updatedTerm }))
      .unwrap()
      .then(() => {
        setEditingTerm(null);
        setIsModalOpen(false); // Close modal after saving
        setDisplayMessage("Term updated successfully.");
      })
      .catch((error) => {
        setDisplayMessage(error);
      });
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mx-auto px-4 lg:px-0">
      <TermHeader />

      {/* Success or Error Message */}
      {displayMessage && (
        <div
          className={`mb-4 mt-6 rounded-lg border-l-4 ${
            displayMessage.includes("successfully")
              ? "border-green-500 bg-green-100 text-green-800"
              : "border-red-500 bg-red-100 text-red-800"
          } p-3 shadow-md`}
        >
          {displayMessage}
        </div>
      )}

      {/* "No terms found" message */}
      {noTermsFound && (
  <div className="mb-4 mt-6 rounded-lg border-l-4 border-red-500 bg-red-100 text-red-800 p-6 shadow-md flex items-center justify-center">
    No terms found
  </div>
)}


      {/* List of Terms */}
      <div className="space-y-4 p-4">
        {status === "loading" ? (
          <p>Loading terms...</p>
        ) : (
          terms.map((term) => (
            <div
              key={term.id}
              className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-md p-4"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faPen}
                    className="text-green-500 text-xl"
                  />
                </div>

                <div className="ml-4 flex-grow">
                  <p className="text-gray-500 text-sm">
                    {term.from} - {term.to}
                  </p>
                  <h3 className="text-lg font-semibold">{term.name}</h3>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleEditClick(term)}
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
            </div>
          ))
        )}
      </div>

      {/* Modal for editing term */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Edit Term</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">
                  Term Name
                </label>
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
                <label className="block text-sm font-semibold text-gray-700">
                  From
                </label>
                <input
                  type="number"
                  name="from"
                  value={termData.from}
                  onChange={handleEditChange}
                  className="mt-1 p-2 border rounded-md w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">
                  To
                </label>
                <input
                  type="number"
                  name="to"
                  value={termData.to}
                  onChange={handleEditChange}
                  className="mt-1 p-2 border rounded-md w-full"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="py-2 px-4 bg-[#117C90] text-white rounded"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="py-2 px-4 border border-gray-300 rounded text-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TermList;
