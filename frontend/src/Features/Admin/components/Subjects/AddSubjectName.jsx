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
      .catch((error) => {
        console.log(error || "Failed to add subject");
      });
  };

  return (
    <div className="w-[80%] mx-auto">
      <h1 className="text-2xl font-semibold text-[#244856] pl-5">Add Subject</h1>
      <div className="mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856] ml-3"></div>
      <div className="bg-[#F5F5F5] shadow-md p-6 rounded-3xl">
        <form onSubmit={handleAddSubject} className="m-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter Subject Name
            </label>
            <input
              type="text"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              placeholder="Enter subject name"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-[#117C90] text-white rounded-md text-sm font-medium hover:bg-[#0f6b7c] transition mx-auto block"
          >
            Add Subject
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddSubject;
