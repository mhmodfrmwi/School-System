import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { editSubject, fetchSubjects } from "../AdminRedux/subjectSlice";
import { toast } from "react-toastify";

const EditSubject = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { subjects} = useSelector((state) => state.subject);

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
    <div className="w-[80%] mx-auto mt-10">
      <h1 className="text-2xl font-semibold text-[#244856] pl-5">Edit Subject</h1>
      <div className="mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856] ml-3"></div>
      <div className="bg-[#F5F5F5] shadow-md p-6 rounded-3xl">
        <form onSubmit={handleSubmit} className="m-6">
            <>
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
                Save Changes
              </button>
            </>
          
        </form>
      </div>
    </div>
  );
};

export default EditSubject;
