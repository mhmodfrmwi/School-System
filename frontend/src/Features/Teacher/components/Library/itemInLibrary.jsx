import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLibraryItemById } from "../TeacherRedux/generalLibrarySlice";
import { useTranslation } from 'react-i18next';

const ItemInLibrary = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t ,i18n} = useTranslation();
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
    <div className="mx-auto mt-10 max-w-4xl font-poppins rounded-lg bg-white dark:bg-DarkManager2 p-6 shadow-lg">
      {generalLibrary ? (
        <div>
          <h1 className="mb-4 text-3xl font-semibold text-[#117C90] dark:text-white">
            {generalLibrary.title}
          </h1>
          <p className="mb-2 text-xl">
            <strong className=" text-black">{t('libraryItem.author')}:</strong>{" "}
            {generalLibrary.author}
          </p>
          <p className="mb-2 text-xl">
            <strong className=" text-black">{t('libraryItem.type')}:</strong>{" "}
            {generalLibrary.type}
          </p>
          <p className="mb-4 text-xl">
            <strong className=" text-black">{t('libraryItem.uploadedBy')}:</strong>{" "}
            {generalLibrary.uploaded_by?.fullName}
          </p>

          <div className={`flex ${i18n.language === 'ar' ? 'space-x-reverse' : ''} space-x-4`}>
            <a
              href={generalLibrary.item_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-md bg-[#117C90] dark:bg-DarkManager px-4 py-2 font-semibold text-white transition duration-300 hover:bg-[#0e6a7a]"
            >
              View Item
            </a>
            <button
              onClick={handleCancel}
              className="inline-block rounded-md bg-red-500 px-4 py-2 font-semibold text-white transition duration-300 hover:bg-red-600"
            >
              {t('assignmentt.Cancel')}
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No item found.</p>
      )}
    </div>
  );
};

export default ItemInLibrary;