import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchAssignedSubjects, deleteAssignedSubject } from "../AdminRedux/AssignSubjectSlice";
import { fetchGrades } from "../AdminRedux/gradeSlice";
import Loader from "@/ui/Loader";
import SubjectsHeader from "./SubjectsHeader";
import { toast } from "react-toastify";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faPen} from "@fortawesome/free-solid-svg-icons";

const AssignedSubjects = () => {
  const dispatch = useDispatch();
  const { assignedSubjects, loading: loadingSubjects } = useSelector(
    (state) => state.assignSubject
  );
  const { grade, loading: loadingGrades } = useSelector(
    (state) => state.grades
  );
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchAssignedSubjects());
    dispatch(fetchGrades());
  }, [dispatch]);

  const filteredSubjects = assignedSubjects.filter(
    (subject) => subject.subjectId === id
  );

  const subjectsWithGradeName = filteredSubjects.map((subject) => {
    const gradeName =
      grade.find((g) => g._id === subject.grade)?.gradeName || "Unknown";
    return { ...subject, gradeName };
  });

  const handleDeleteSubject = (_id) => {
    if (_id) {
      dispatch(deleteAssignedSubject(_id)); 
    } else {
      toast.error("Invalid subject ID. Cannot delete subject.");
    }
  };

  if (loadingSubjects || loadingGrades) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-4">
      <SubjectsHeader />
      <div className="overflow-x-auto w-4/5 mx-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-center">Subject</th>
              <th className="px-4 py-2 text-center">Grade</th>
              <th className="px-4 py-2 text-center">Term</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subjectsWithGradeName.length > 0 ? (
              subjectsWithGradeName.map((subject, index) => (
                <tr
                  key={subject._id || index}
                  className={`${
                    index % 2 === 0 ? "bg-[#f5f5f5]" : "bg-white"
                  } hover:bg-[#117C90] hover:text-white`}
                >
                  <td className="px-4 py-2 text-center">{subject.subject}</td>
                  <td className="px-4 py-2 text-center">{subject.gradeName}</td>
                  <td className="px-4 py-2 text-center">{subject.term}</td>
                  <td className="px-4 py-2 text-center flex justify-center gap-4 text-[#117C90]">
                    <Link
                                        to={`/admin/edit-assigned-subject/${subject._id}`}
                                      className="w-5 h-5 text-[#3C8D99] hover:text-[#2C6E79]"
                                    >
                                      <FontAwesomeIcon icon={faPen} className="w-5 h-5" />
                                    </Link>
                    <button
                      className="transition duration-300 hover:text-white"
                      onClick={() => handleDeleteSubject(subject._id)} 
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-2 px-4 border-b text-center">
                  No subjects found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedSubjects;
