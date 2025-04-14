import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { editSubject, fetchSubjects } from "../AdminRedux/subjectSlice";
import { toast } from "react-toastify";

const EditSubject = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { subjects } = useSelector((state) => state.subject);

  const [subjectName, setSubjectName] = useState("");

  // Fetch subjects when the component loads
  useEffect(() => {
    dispatch(fetchSubjects());
  }, [dispatch]);

  // Set the subject name if the subject is found
  useEffect(() => {
    const selectedSubject = subjects.find((subject) => subject._id === id);
    if (selectedSubject) {
      setSubjectName(selectedSubject.subjectName);
    }
  }, [subjects, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedSubject = { subjectName };

    dispatch(editSubject({ id, updatedSubject }))
      .unwrap()
      .then(() => {
        toast.success("Subject updated successfully");
        navigate("/admin/allsubjects");
      })
      .catch((error) => {
        toast.error(error || "Failed to update subject");
      });
  };

  return (
    <div className="mx-auto mt-10 w-[80%]">
      <h1 className="pl-5 text-2xl font-semibold text-[#244856]">
        Edit Subject
      </h1>
      <div className="ml-3 mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856]"></div>
      <div className="rounded-3xl bg-[#F5F5F5] p-6 shadow-md dark:bg-[#117C90]">
        <form onSubmit={handleSubmit} className="m-6">
          <>
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-white">
                Enter Subject Name
              </label>
              <input
                type="text"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
                placeholder="Enter subject name"
              />
            </div>
            <button
              type="submit"
              className="mx-auto block rounded-md bg-[#117C90] px-6 py-2 text-sm font-medium text-white transition hover:bg-[#0f6b7c] dark:bg-white dark:text-black"
            >
              Save Changes
            </button>
          </>
        </form>
      </div>
    </div>
  );
};

export default EditSubject;
