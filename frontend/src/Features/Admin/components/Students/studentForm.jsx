import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postStudent } from "../AdminRedux/studentSlice";
import { fetchGrades } from "../AdminRedux/gradeSlice";
import { toast } from "react-toastify";
import Loader from "@/ui/Loader";

function AddStudent() {
  const dispatch = useDispatch();
  const { grades } = useSelector((state) => state.grades);
  const { loading } = useSelector((state) => state.students);

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
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleAddStudent = (e) => {
    e.preventDefault();

    dispatch(postStudent(studentData))
      .unwrap()
      .then(() => {
        toast.success("Student added successfully!");
        setStudentData({
          fullName: "",
          emailAddress: "",
          phoneNumber: "",
          password: "",
          dateOfBirth: "",
          gender: "",
          grade: "",
          address: "",
        });
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <div className="relative mx-auto my-10 w-[80%] font-poppins">
      {loading && <Loader />}
      <h1 className="pl-5 text-2xl font-semibold text-[#244856]">
        Add Student
      </h1>
      <div className="ml-3 mt-1 h-[4px] w-[160px] rounded-t-md bg-[#244856]"></div>
      <div className="rounded-3xl bg-[#F5F5F5] p-6 shadow-md">
        <form
          onSubmit={handleAddStudent}
          className="m-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {Object.keys(studentData).map((key) => (
            <div className="mb-4" key={key}>
              <label className="text-md mb-2 block font-medium capitalize text-gray-700">
                {key.replace(/([A-Z])/g, " $1")}
              </label>
              {key === "gender" ? (
                <select
                  name={key}
                  value={studentData[key]}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                >
                  <option value="">Select Gender</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              ) : key === "grade" ? (
                <select
                  name={key}
                  value={studentData[key]}
                  onChange={handleChange}
                  className="z-10 w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                >
                  <option value=""> Select Grade </option>
                  {grades.map((g, index) => (
                    <option key={index} value={g.gradeName}>
                      {g.gradeName}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={
                    key === "password"
                      ? "password"
                      : key === "dateOfBirth"
                        ? "date"
                        : "text"
                  }
                  name={key}
                  value={studentData[key]}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                  placeholder={`Enter ${key.replace(/([A-Z])/g, " $1")}`}
                />
              )}
            </div>
          ))}

          <div className="col-span-1 sm:col-span-2">
            <button
              type="submit"
              className="text-md mx-auto block rounded-md bg-[#117C90] px-6 py-2 font-medium text-white transition hover:bg-[#0f6b7c]"
            >
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStudent;
