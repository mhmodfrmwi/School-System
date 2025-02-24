import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLibraryItemById } from "../TeacherRedux/generalLibrarySlice";

const ItemInLibrary = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { generalLibrary, loading, error } = useSelector(
    (state) => state.generalLibrary || {},
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchLibraryItemById(id));
    }
  }, [dispatch, id]);

  const handleCancel = () => {
    navigate("/teacher/items-in-library");
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading item details...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error.message}</p>;
  }

  return (
    <div className="mx-auto mt-10 max-w-4xl rounded-lg bg-white p-6 shadow-lg">
      {generalLibrary ? (
        <div>
          <h1 className="mb-4 text-3xl font-semibold text-[#244856]">
            {generalLibrary.title}
          </h1>
          <p className="mb-2 text-xl">
            <strong className="text-[#117C90]">Author:</strong>{" "}
            {generalLibrary.author}
          </p>
          <p className="mb-2 text-xl">
            <strong className="text-[#117C90]">Type:</strong>{" "}
            {generalLibrary.type}
          </p>
          <p className="mb-4 text-xl">
            <strong className="text-[#117C90]">Uploaded By:</strong>{" "}
            {generalLibrary.uploaded_by?.fullName}
          </p>

          <div className="mb-6">
            <a
              href={generalLibrary.item_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-md bg-[#117C90] px-4 py-2 font-semibold text-white transition duration-300"
            >
              View Item
            </a>
          </div>

          <button
            onClick={handleCancel}
            className="inline-block rounded-md bg-red-500 px-4 py-2 font-semibold text-white transition duration-300 hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      ) : (
        <p className="text-center text-gray-500">No item found.</p>
      )}
    </div>
  );
};

export default ItemInLibrary;
