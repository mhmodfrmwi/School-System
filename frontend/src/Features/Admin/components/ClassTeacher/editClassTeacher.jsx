import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchClasses } from "../AdminRedux/classSlice";
import { fetchSubjects } from "../AdminRedux/subjectSlice";
import { fetchTeachers } from "../AdminRedux/teacherSlice";
import { editClassTeacher } from "../AdminRedux/classTeacherSlice";
const EditClassTeacherForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Data from the Redux store
  const { classes } = useSelector((state) => state.classes);
  const { subjects } = useSelector((state) => state.subject);
  const { teachers } = useSelector((state) => state.teachers);
  const { classTeachers} = useSelector((state) => state.classTeacher);

  // State to hold the form data
  const [formData, setFormData] = useState({
    teacherSubject: "", // Combines teacher and subject
    classAcademicYear: "", // Combines class and academic year
  });

  useEffect(() => {
    dispatch(fetchClasses());
    dispatch(fetchSubjects());
    dispatch(fetchTeachers());
  }, [dispatch]);

  useEffect(() => {
    // Find the class teacher to edit
    const classTeacherToEdit = classTeachers.find(
      (teacher) => teacher._id === id
    );
    if (classTeacherToEdit) {
      setFormData({
        teacherSubject: `${classTeacherToEdit.teacherId._id}-${classTeacherToEdit.subjectId._id}`,
        classAcademicYear: `${classTeacherToEdit.classId._id}-${classTeacherToEdit.academicYear_id._id}`,
      });
    }
  }, [classTeachers, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Split the combined values back into individual IDs
    const [teacherId, subjectId] = formData.teacherSubject.split("-");
    const [classId, academicYearId] = formData.classAcademicYear.split("-");

    // Find the corresponding names for the IDs
    const selectedTeacher = teachers.find((teacher) => teacher._id === teacherId);
    const selectedSubject = subjects.find((subject) => subject._id === subjectId);
    const selectedClass = classes.find((cls) => cls._id === classId);
    const selectedAcademicYear = classTeachers.find(
      (ct) => ct.academicYear_id._id === academicYearId
    )?.academicYear_id;

    // Prepare the data to match the server's expectations
    const updatedClassTeacher = {
      className: selectedClass?.className || "",
      subjectName: selectedSubject?.subjectName || "",
      teacherName: selectedTeacher?.fullName || "",
      academicYear: selectedAcademicYear
        ? `${selectedAcademicYear.startYear}-${selectedAcademicYear.endYear}`
        : "",
    };

    dispatch(editClassTeacher({ id, updatedClassTeacher }))
      .unwrap()
      .then(() => {
        navigate(`/admin/allteachers/${id}`);
      })
      .catch((error) => {
        console.error("Error updating class teacher", error);
      });
  };

  return (
    <div className="w-[80%] mx-auto mt-10">
      <h1 className="text-2xl font-semibold text-[#244856] pl-5">Edit Class Teacher</h1>
      <div className="mt-1 h-[4px] w-[170px] rounded-t-md bg-[#244856] ml-3"></div>
      <div className="bg-[#F5F5F5] shadow-md p-6 rounded-3xl">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 m-6">
          {/* Teacher-Subject Field */}
          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">Teacher-Subject</label>
            <select
              name="teacherSubject"
              value={formData.teacherSubject}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="">Select Teacher-Subject</option>
              {teachers?.map((teacher) =>
                subjects?.map((subject) => (
                  <option
                    key={`${teacher._id}-${subject._id}`}
                    value={`${teacher._id}-${subject._id}`}
                  >
                    {teacher.fullName} - {subject.subjectName}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Class-Academic Year Field */}
          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">Class-Academic Year</label>
            <select
              name="classAcademicYear"
              value={formData.classAcademicYear}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="">Select Class-Academic Year</option>
              {classes?.map((cls) =>
                classTeachers.map((ct) => (
                  <option
                    key={`${cls._id}-${ct.academicYear_id._id}`}
                    value={`${cls._id}-${ct.academicYear_id._id}`}
                  >
                    {cls.className} - {ct.academicYear_id.startYear} - {ct.academicYear_id.endYear}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Submit Button */}
          <div className="col-span-1 sm:col-span-2">
            <button
              type="submit"
              className="px-6 py-2 bg-[#117C90] text-white rounded-md text-md font-medium hover:bg-[#0f6b7c] transition mx-auto block"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditClassTeacherForm;