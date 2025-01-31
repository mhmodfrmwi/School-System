import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchClasses } from "../AdminRedux/classSlice";
import { fetchSubjects } from "../AdminRedux/subjectSlice";
import { fetchTeachers } from "../AdminRedux/teacherSlice";
import { editClassTeacher } from "../AdminRedux/classTeacherSlice";
import Loader from "@/ui/Loader";

const EditClassTeacherForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Data from the Redux store
  const { classes } = useSelector((state) => state.classes);
  const { subjects } = useSelector((state) => state.subject);
  const { teachers } = useSelector((state) => state.teachers);
  const { classTeachers, loading } = useSelector((state) => state.classTeacher);


  // State to hold the form data
  const [formData, setFormData] = useState({
    className: "",
    subjectName: "",
    teacherName: "",
    academicYear: "",
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
    console.log(classTeacherToEdit);
    if (classTeacherToEdit) {
      setFormData({
        className: classTeacherToEdit.classId._id, // Use classId._id to set the value
        subjectName: classTeacherToEdit.subjectId._id, // Use subjectId._id to set the value
        teacherName: classTeacherToEdit.teacherId._id, // Use teacherId._id to set the value
        academicYear: classTeacherToEdit.academicYear_id._id, // Assuming you want to store academicYear as ID
      });
    }
  }, [classTeachers, id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedClassTeacher = { ...formData };

    dispatch(editClassTeacher({ id, updatedClassTeacher }))
      .unwrap()
      .then(() => {
        navigate("/admin/allclassTeachers");
      })
      .catch((error) => {
        console.error("Error updating class teacher", error);
      });
  };

  return (
    <div className="w-[80%] mx-auto mt-10">
      {loading && <Loader />}
      <h1 className="text-2xl font-semibold text-[#244856] pl-5">Edit Class Teacher</h1>
      <div className="mt-1 h-[4px] w-[170px] rounded-t-md bg-[#244856] ml-3"></div>
      <div className="bg-[#F5F5F5] shadow-md p-6 rounded-3xl">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 m-6">
          {/* Select Class */}
          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">Class</label>
            <select
              name="className"
              value={formData.className}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="">Select Class</option>
              {classes?.map((cls) => (
                <option key={cls._id} value={cls._id}>
                  {cls.className}
                </option>
              ))}
            </select>
          </div>

          {/* Select Subject */}
          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">Subject</label>
            <select
              name="subjectName"
              value={formData.subjectName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="">Select Subject</option>
              {subjects?.map((subject) => (
                <option key={subject._id} value={subject._id}>
                  {subject.subjectName}
                </option>
              ))}
            </select>
          </div>

          {/* Select Teacher */}
          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">Teacher</label>
            <select
              name="teacherName"
              value={formData.teacherName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="">Select Teacher</option>
              {teachers?.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.fullName}
                </option>
              ))}
            </select>
          </div>

          {/* Select Academic Year */}
          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">Academic Year</label>
            <select
              name="academicYear"
              value={formData.academicYear}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="">Select Academic Year</option>
              {/* Assuming you have academicYears available in your state */}
              {classTeachers.map((ct) => (
                <option key={ct.academicYear_id._id} value={ct.academicYear_id._id}>
                  {ct.academicYear_id.startYear} - {ct.academicYear_id.endYear}
                </option>
              ))}

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
