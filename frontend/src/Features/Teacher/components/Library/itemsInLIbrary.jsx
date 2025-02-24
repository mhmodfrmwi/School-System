import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchLibraryItems,
  deleteLibraryItemById,
} from "../TeacherRedux/generalLibrarySlice";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";

const ItemsInLibrary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { generalLibrary = [] } = useSelector(
    (state) => state.generalLibrary || {},
  );

  useEffect(() => {
    dispatch(fetchLibraryItems());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteLibraryItemById(id));
      toast.success("Item deleted successfully!");
    } catch (err) {
      toast.error("Failed to delete item: " + err.message);
    }
  };

  return (
    <>
      <div className="m-auto mb-6 grid w-[90%] grid-cols-1 gap-2 rounded-3xl bg-gray-100 md:grid-cols-3">
        <button
          className="flex cursor-pointer items-center justify-center rounded-3xl bg-[##EFEFEF] py-2 font-medium text-[#117C90] focus:outline-none"
          onClick={() => navigate("/teacher/teacher-library")}
        >
          <span className="mr-2 flex w-6 items-center justify-center rounded-full bg-[#117C90] text-white">
            1
          </span>
          Library
        </button>

        <button
          className="flex cursor-pointer items-center justify-center rounded-3xl bg-[##EFEFEF] py-2 font-medium text-[#117C90] focus:outline-none"
          onClick={() => navigate("/teacher/all-subjects-library")}
        >
          <span className="mr-2 flex w-6 items-center justify-center rounded-full bg-[#117C90] text-white">
            2
          </span>
          Teacher Library
        </button>
        <button
          className="flex cursor-pointer items-center justify-center rounded-b-3xl bg-[#117C90] py-2 font-medium text-white focus:outline-none md:rounded-3xl"
          onClick={() => navigate("/teacher/items-in-library")}
        >
          <span className="mr-2 flex w-6 items-center justify-center rounded-full bg-white text-[#117C90]">
            3
          </span>
          General Library
        </button>
      </div>
      <div className="flex flex-col p-4">
        <div className="mx-auto w-[400px] p-6 sm:w-[550px] md:w-[700px] lg:px-0 xl:w-full">
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
            <div className="">
              <h1 className="font-poppins text-lg font-semibold text-[#244856] sm:text-xl lg:text-2xl">
                Library Materials
              </h1>
              <p className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[150px]"></p>
            </div>

            <div
              className="flex w-52 cursor-pointer items-center justify-center rounded-3xl bg-[#117C90] py-2 font-medium text-white focus:outline-none sm:ml-auto"
              onClick={() => navigate("/teacher/library-item-form")}
            >
              Add Item
            </div>
          </div>
          <div className="mt-7">
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse overflow-hidden rounded-[1rem] border-2 border-[#117C90] bg-[#FBE9D1] shadow-md shadow-[#117C90]">
                <thead className="bg-[#117C90] text-white">
                  <tr>
                    <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                      Title
                    </th>
                    <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                      Author
                    </th>
                    <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                      Type
                    </th>
                    <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                      Link
                    </th>
                    <th className="px-3 py-2 text-left font-poppins text-xs font-medium sm:text-sm md:text-base">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {generalLibrary.length > 0 ? (
                    generalLibrary.map((item, index) => (
                      <tr
                        key={item._id}
                        className={`${
                          index % 2 === 0 ? "bg-[#F5FAFF]" : "bg-white"
                        } hover:bg-[#117C90]/70`}
                      >
                        <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                          {item.title}
                        </td>
                        <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                          {item.author}
                        </td>
                        <td className="px-3 py-2 font-poppins text-xs sm:text-sm md:text-base">
                          {item.type}
                        </td>
                        <td>
                          <a
                            href={item.item_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="texthover:underline"
                          >
                            continued
                          </a>
                        </td>
                        <td className="space-x-2 px-3 py-2 text-xs sm:text-sm md:text-base">
                          <button
                            onClick={() =>
                              navigate(`/teacher/item-in-library/${item._id}`)
                            } // navigate to item details page
                            className="text-[#117C90] transition duration-300 hover:text-[#244856]"
                          >
                            <FontAwesomeIcon icon={faEye} className="text-lg" />
                          </button>
                          <button
                            onClick={() =>
                              navigate(
                                `/teacher/update-item-library/${item._id}`,
                              )
                            }
                            className="text-[#117C90] transition duration-300 hover:text-[#244856]"
                          >
                            <FontAwesomeIcon
                              icon={faEdit}
                              className="text-lg"
                            />
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="text-[#E74833] transition duration-300 hover:text-[#244856]"
                          >
                            <FontAwesomeIcon
                              icon={faTrashAlt}
                              className="text-lg"
                            />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-9 text-center font-poppins">
                        No Items Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemsInLibrary;
