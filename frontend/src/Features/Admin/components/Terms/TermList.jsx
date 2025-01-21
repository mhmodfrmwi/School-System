import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTerm, fetchTerms, editTermAsync } from "../AdminRedux/termSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import TermHeader from "./termHeader";
import Swal from "sweetalert2";

const TermList = () => {
  const { terms = [], loading } = useSelector((state) => state.terms || {});
  const dispatch = useDispatch();

  const [termData, setTermData] = useState({
    startYear: "",
    endYear: "",
    term: "",
  });

  const [editingTerm, setEditingTerm] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchTerms());
  }, [dispatch]);

  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        await dispatch(removeTerm(id));
        Swal.fire("Deleted!", "The term has been deleted.", "success");
      } catch (error) {
        Swal.fire(
          "Error!",
          "An error occurred while deleting the term.",
          "error",
        );
      }
    }
  };

  const handleEditClick = (term) => {
    setEditingTerm(term._id);
    setTermData({
      term: term.term,
      startYear: term.startYear,
      endYear: term.endYear,
    });
    setIsModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setTermData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!termData.term || !termData.startYear || !termData.endYear) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please fill in all required fields.",
      });
      return;
    }

    const updatedTerm = {
      term: termData.term,
      startYear: termData.startYear,
      endYear: termData.endYear,
    };

    try {
      await dispatch(editTermAsync({ id: editingTerm, updatedTerm })).unwrap();
      setIsModalOpen(false);
      Swal.fire(
        "Success!",
        "The term has been updated successfully.",
        "success",
      );
    } catch (error) {
      Swal.fire(
        "Error!",
        error.message || "Failed to update the term.",
        "error",
      );
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mx-auto px-4 lg:px-0">
      <TermHeader />
      <div className="space-y-4 p-4">
        {loading ? (
          <p>Loading terms...</p>
        ) : (
          terms.map((term, index) => (
            <div
              key={term._id || index}
              className="flex flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-md"
            >
              <div className="flex items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <FontAwesomeIcon
                    icon={faPen}
                    className="text-xl text-green-500"
                  />
                </div>
                <div className="ml-4 flex-grow">
                  <p className="text-sm text-gray-500">
                    {term.startYear} - {term.endYear}
                  </p>
                  <h3 className="text-lg font-semibold">
                    {term.term &&
                    typeof term.term === "string" &&
                    term.term.trim() !== ""
                      ? term.term
                      : "No Term Available"}
                  </h3>
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
                    onClick={() => handleDelete(term._id)}
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

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold">Edit Term</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="term"
                  className="block text-sm font-medium text-gray-700"
                >
                  Term
                </label>
                <select
                  name="term"
                  value={termData.term}
                  onChange={handleEditChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                >
                  <option value="">Select Term</option>
                  <option value="Term 1">Term 1</option>
                  <option value="Term 2">Term 2</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="startYear"
                  className="block text-sm font-medium text-gray-700"
                >
                  Start Year
                </label>
                <input
                  type="number"
                  id="startYear"
                  name="startYear"
                  value={termData.startYear}
                  onChange={handleEditChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="endYear"
                  className="block text-sm font-medium text-gray-700"
                >
                  End Year
                </label>
                <input
                  type="number"
                  id="endYear"
                  name="endYear"
                  value={termData.endYear}
                  onChange={handleEditChange}
                  className="w-full rounded-md border border-gray-300 p-2"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="rounded-md bg-gray-300 p-2 text-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-blue-500 p-2 text-white"
                >
                  Save Changes
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
