import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGrades } from "../AdminRedux/gradeSlice";
import { fetchStudents, editStudent } from "../AdminRedux/studentSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function EditStudent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { grades } = useSelector((state) => state.grades);
  const { students} = useSelector((state) => state.students);

  const [studentData, setStudentData] = useState({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    password: "",
    dateOfBirth: "",
    gender: "",
    grade: "",
    address: "",
  });

  useEffect(() => {
    dispatch(fetchGrades());
    dispatch(fetchStudents(id));
  }, [dispatch, id]);

  useEffect(() => {
    const student = students.find((student) => student._id === id);
    if (student) {
      setStudentData({
        fullName: student.fullName,
        emailAddress: student.email,
        phoneNumber: student.phone,
        password: student.password,
        dateOfBirth: student.dateOfBirth
          ? new Date(student.dateOfBirth).toISOString().split("T")[0]
          : "",
        gender: student.gender,
        grade: student.gradeId?.gradeName,
        address: student.address,
      });
    }
  }, [id, students]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editStudent({ id, updatedStudent: studentData }))
      .unwrap()
      .then(() => {
        toast.success("Student updated successfully!");
        navigate("/admin/allstudent");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div className="relative mx-auto my-10 w-[80%] font-poppins">
      <h1 className="pl-5 text-2xl font-semibold text-[#244856]">
        Edit Student
      </h1>
      <div className="ml-3 mt-1 h-[4px] w-[160px] rounded-t-md bg-[#244856]"></div>
      <div className="rounded-3xl bg-[#F5F5F5] p-6 shadow-md">
        <form
          onSubmit={handleSubmit}
          className="m-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <div className="mb-4">
            <label className="my-2 block font-semibold text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={studentData.fullName}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            />
          </div>
          <div className="mb-4">
            <label className="my-2 block font-semibold text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="emailAddress"
              value={studentData.emailAddress}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            />
          </div>
          <div className="mb-4">
            <label className="my-2 block font-semibold text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={studentData.phoneNumber}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            />
          </div>
          <div className="mb-4">
            <label className="my-2 block font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={studentData.password}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            />
          </div>
          <div className="mb-4">
            <label className="my-2 block font-semibold text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={studentData.dateOfBirth}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            />
          </div>
          <div className="mb-4">
            <label className="my-2 block font-semibold text-gray-700">
              Gender
            </label>
            <select
              name="gender"
              value={studentData.gender}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="my-2 block font-semibold text-gray-700">
              Grade
            </label>
            <select
              name="grade"
              value={studentData.grade}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="">Select Grade</option>
              {grades.map((g, index) => (
                <option key={index} value={g.gradeName}>
                  {g.gradeName}
                </option>
              ))}
            </select>
          </div>
          <div className="col-span-1 flex justify-end sm:col-span-2">
            <button
              type="submit"
              className="rounded-md bg-[#117C90] px-6 py-2 font-medium text-white transition hover:bg-[#0f6b7c]"
            >
              Update Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditStudent;
