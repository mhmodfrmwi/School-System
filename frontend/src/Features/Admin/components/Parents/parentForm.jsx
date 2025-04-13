import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postParent } from "../AdminRedux/parentSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { fetchStudents } from "../AdminRedux/studentSlice";

function ParentForm() {
  const dispatch = useDispatch();
  const { students } = useSelector((state) => state.students);

  useEffect(() => {
    console.log(fetchStudents);
    dispatch(fetchStudents());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    students: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleStudentChange = (index, e) => {
    const { value } = e.target;
    const updatedStudents = [...formData.students];
    updatedStudents[index] = value;
    setFormData({ ...formData, students: updatedStudents });
  };

  const addStudent = () => {
    setFormData((prevState) => ({
      ...prevState,
      students: [...prevState.students, ""],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(postParent(formData))
      .unwrap()
      .then(() => {
        setFormData({
          fullName: "",
          email: "",
          password: "",
          phone: "",
          gender: "",
          students: [],
        });
      })
      .catch((error) => {});
  };

  return (
    <div className="relative mx-auto my-10 w-[80%] font-poppins">
      <h1 className="pl-5 text-2xl font-semibold text-[#244856]">Add Parent</h1>
      <div className="ml-3 mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856]"></div>
      <div className="rounded-3xl bg-[#F5F5F5] p-6 shadow-md dark:bg-[#117C90]">
        <form
          onSubmit={handleSubmit}
          className="m-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
              placeholder="Enter password"
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
            >
              <option value="">Select gender</option>
              <option value="M">M</option>
              <option value="F">F</option>
            </select>
          </div>

          {formData.students.map((student, index) => (
            <div key={index} className="mb-4">
              <label className="text-md mb-2 block font-medium text-gray-700 dark:text-white">
                Student Name
              </label>
              <select
                value={student}
                onChange={(e) => handleStudentChange(index, e)}
                className="z-10 w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
              >
                <option value=""> Select StudentID </option>
                {students.map((AN, index) => (
                  <option key={index} value={AN.academic_number}>
                    {AN.fullName} ({AN.academic_number})
                  </option>
                ))}
              </select>
            </div>
          ))}

          <button
            type="button"
            onClick={addStudent}
            className="mt-4 flex items-center font-semibold text-[#117C90] dark:text-white"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add student
          </button>

          <div className="col-span-1 mt-6 sm:col-span-2">
            <button
              type="submit"
              className="text-md mx-auto block rounded-md bg-[#117C90] px-6 py-2 font-medium text-white transition hover:bg-[#0f6b7c] dark:bg-white dark:text-black"
            >
              Add Parent
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ParentForm;
