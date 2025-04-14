import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postSubject } from "../AdminRedux/subjectSlice";
import { toast } from "react-toastify";

function AddSubject() {
  const dispatch = useDispatch();
  const [subjectName, setSubjectName] = useState("");

  const handleAddSubject = (e) => {
    e.preventDefault();

    const newSubject = {
      subjectName,
    };

    dispatch(postSubject(newSubject))
      .unwrap()
      .then(() => {
        toast.success("Subject added successfully!");
        setSubjectName("");
      })
      .catch((error) => {});
  };

  return (
    <div className="mx-auto my-10 w-[80%] font-poppins">
      <h1 className="pl-5 text-2xl font-semibold text-[#244856]">
        Add Subject
      </h1>
      <div className="ml-3 mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856]"></div>
      <div className="rounded-3xl bg-[#F5F5F5] p-6 shadow-md dark:bg-[#117C90]">
        <form
          onSubmit={handleAddSubject}
          className="m-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {/* Subject Name */}
          <div className="mb-4 sm:col-span-2">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
              Enter Subject Name
            </label>
            <input
              type="text"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
              placeholder="Enter subject name"
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-1 mt-6 sm:col-span-2">
            <button
              type="submit"
              className="text-md mx-auto block rounded-md bg-[#117C90] px-6 py-2 font-medium text-white transition hover:bg-[#0f6b7c] dark:bg-white dark:text-black"
            >
              Add Subject
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSubject;
