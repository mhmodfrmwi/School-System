import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubjects, removeSubject } from "../AdminRedux/subjectSlice";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faPen, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import SubjectsHeader from "./SubjectsHeader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "@/ui/Loader";

const SubjectsList = () => {
  const dispatch = useDispatch();
  const { subjects, loading } = useSelector((state) => state.subject);

  useEffect(() => {
    dispatch(fetchSubjects());
  }, [dispatch]);

 

  const handleDelete = (_id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this subject?");
    if (confirmDelete) {
      dispatch(removeSubject(_id))
        .unwrap()
        .then(() => toast.success("Subject deleted successfully!"))
        .catch((err) => console.log(err));
    }
  };

  const colors = [
    "bg-green-200",
    "bg-blue-200",
    "bg-orange-200",
    "bg-red-200",
    "bg-purple-200",
    "bg-teal-200",
  ];
  const iconColors = [
    "text-green-600",
    "text-blue-600",
    "text-orange-600",
    "text-red-600",
    "text-purple-600",
    "text-teal-600",
  ];
  const getIconColor = (index) => colors[index % colors.length];
  const getIconTextColor = (index) => iconColors[index % iconColors.length];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <SubjectsHeader />
      <div className="flex justify-center">
        <div className="space-y-4 w-4/5">
          {subjects.map((subject, index) => (
            <div
              key={subject._id}
              className="flex flex-col sm:flex-row justify-between items-center p-4 bg-white shadow-md rounded-md"
            >
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <div
                  className={`w-16 h-16 flex items-center justify-center rounded-full ${getIconColor(
                    index
                  )}`}
                >
                  <FontAwesomeIcon icon={faBook} className={`text-2xl ${getIconTextColor(index)}`} />
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 text-xl mx-2 h-7 border-l-2 border-gray-600"></span>
                  <h2 className="text-base font-bold">{subject.subjectName}</h2>
                </div>
              </div>

              <div className="flex sm:flex-row flex-row sm:space-x-4 space-x-4 space-y-2 sm:space-y-0 justify-center">
                <Link
                  to={`/admin/allsubjects/${subject._id}`}
                  className="w-5 h-5 text-[#3C8D99] hover:text-[#2C6E79] sm:mt-0 mt-2"
                >
                  <FontAwesomeIcon icon={faEye} className="w-5 h-5" />
                </Link>

                <Link
                    to={`/admin/edit-subject/${subject._id}`}
                  className="w-5 h-5 text-[#3C8D99] hover:text-[#2C6E79]"
                >
                  <FontAwesomeIcon icon={faPen} className="w-5 h-5" />
                </Link>

                <button
                  onClick={() => handleDelete(subject._id)}
                  className="w-5 h-5 text-[#3C8D99] hover:text-[#2C6E79]"
                >
                  <FontAwesomeIcon icon={faTrash} className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubjectsList;
