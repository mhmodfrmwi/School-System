import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSubjects } from "../AdminRedux/subjectSlice";
import { fetchTeachers, editTeacher } from "../AdminRedux/teacherSlice";
import Loader from "@/ui/Loader";

const EditTeacherForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { subjects, loading } = useSelector((state) => state.subject);
  const { teachers } = useSelector((state) => state.teachers);

  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    phone: "",
    email: "",
    subject: "",
    password: "",
  });

  useEffect(() => {
    dispatch(fetchSubjects());
    dispatch(fetchTeachers());
  }, [dispatch]);

  useEffect(() => {
    const teacherToEdit = teachers.find((teacher) => teacher._id === id);
    if (teacherToEdit) {
      setFormData({
        fullName: teacherToEdit.fullName,
        dateOfBirth: teacherToEdit.dateOfBirth,
        gender: teacherToEdit.gender,
        address: teacherToEdit.address,
        phone: teacherToEdit.phone,
        email: teacherToEdit.email,
        subject: teacherToEdit.subjectId ? teacherToEdit.subjectId._id : "", // Set the subject _id here
        password: "",
      });
    }
  }, [teachers, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      // Find the subject object based on the selected subject ID
  const selectedSubject = subjects.find(subject => subject._id === formData.subject);

  const updatedTeacher = {
    ...formData,
    subject: selectedSubject ? selectedSubject.subjectName : "", // Use subject name here
  };

    dispatch(editTeacher({ id, updatedTeacher }))
      .unwrap()
      .then(() => {
        navigate("/admin/allteachers");
      })
      .catch((error) => {
        console.error("Error updating teacher", error);
      });
  };

  return (
    <div className="w-[80%] mx-auto mt-10">
      {loading && <Loader />}
      <h1 className="text-2xl font-semibold text-[#244856] pl-5">Edit Teacher</h1>
      <div className="mt-1 h-[4px] w-[170px] rounded-t-md bg-[#244856] ml-3"></div>
      <div className="bg-[#F5F5F5] shadow-md p-6 rounded-3xl">
        <form onSubmit={handleSubmit} className="m-6">
          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="" disabled>Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              placeholder="Enter password"
            />
          </div>

          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-2">Subject</label>
            <select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="" disabled>Select Subject</option>
              {subjects.map((subject) => (
                <option key={subject._id} value={subject._id}>
                  {subject.subjectName}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-[#117C90] text-white rounded-md text-md font-medium hover:bg-[#0f6b7c] transition mx-auto block"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTeacherForm;
