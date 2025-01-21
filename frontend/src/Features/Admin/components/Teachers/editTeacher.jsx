import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editTeacherAsync } from "../AdminRedux/teacherSlice"; // تأكد من تعديل المسار حسب مشروعك

function EditTeacher() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    subject: "",
    gender: "",
    assignTeacher: [{ grade: "", class: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubjectChange = (index, e) => {
    const { name, value } = e.target;
    const updateSubjects = formData.assignTeacher.map((assignteacher, i) =>
      i === index ? { ...assignteacher, [name]: value } : assignteacher,
    );
    setFormData({ ...formData, assignTeacher: updateSubjects });
  };

  const addSubject = () => {
    setFormData((prevState) => ({
      ...prevState,
      assignTeacher: [...prevState.assignTeacher, { grade: "", class: "" }],
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password) return;

    dispatch(
      editTeacherAsync({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phoneNumber,
        gender: formData.gender,
        SSN: "30403131700795",
        subject: formData.subject,
        password: formData.password,
        role: "Teacher",
      }),
    );

    setFormData({
      fullName: "",
      email: "",
      password: "",
      phoneNumber: "",
      subject: "",
      gender: "",
      assignTeacher: [{ grade: "", class: "" }],
    });
  };

  return (
    <>
      <div className="mb-6 ms-20 mt-6">
        <h2 className="w-52 font-poppins text-3xl font-bold text-[#043B44]">
          edit Teacher
        </h2>
        <p className="mt-3 w-28 rounded-2xl border-b-4 border-[#117C90]"></p>
      </div>

      <div className="mx-auto w-[95%] max-w-4xl rounded-2xl bg-gray-100 p-14 shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-2 block font-semibold text-[#117C90]">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full rounded-2xl border p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-semibold text-[#117C90]">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-2xl border p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                placeholder="Enter password"
                required
              />
            </div>
            <div>
              <label className="mb-2 block font-semibold text-[#117C90]">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full rounded-2xl border p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                placeholder="Enter phone number"
                required
              />
            </div>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className=" ">
              <label className="block font-semibold text-[#117C90]">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-2xl border p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                placeholder="Enter email address"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-[#117C90]">
                Subject
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full rounded-2xl border p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              >
                <option value="" disabled>
                  Select subject
                </option>
                <option value="Math">Math</option>
                <option value="English">English</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="Physics">Physics</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block font-semibold text-[#117C90]">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full rounded-2xl border bg-[#117C90] p-2 text-white focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <div className="mt-6">
            {formData.assignTeacher.map((assignteacher, index) => (
              <div
                key={index}
                className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2"
              >
                <div>
                  <label className="mb-2 block font-semibold text-[#117C90]">
                    grade
                  </label>
                  <select
                    value={assignteacher.grade}
                    name="grade"
                    onChange={(e) => handleSubjectChange(index, e)}
                    placeholder="Enter student name"
                    required
                    className="w-full rounded-2xl border bg-[#117C90] p-2 text-white focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                  >
                    <option value="" disabled>
                      Select Grade
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">4</option>
                  </select>
                </div>
                <div>
                  <label className="mb-2 block font-semibold text-[#117C90]">
                    Class
                  </label>
                  <select
                    name="class"
                    value={assignteacher.class}
                    onChange={(e) => handleSubjectChange(index, e)}
                    className="w-full rounded-2xl border bg-[#117C90] p-2 text-white focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                  >
                    <option value="" className="font-poppins" disabled>
                      Select class
                    </option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addSubject}
              className="mt-8 font-semibold text-[#117C90]"
            >
              <div className="flex w-44 flex-row justify-between text-center">
                <p className="rounded-full border-2 border-black px-3 py-1 text-black">
                  +
                </p>
                <p className="mt-2"> Add another</p>
              </div>
            </button>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="w-36 rounded-2xl bg-[#117C90] p-2 text-white hover:bg-[#043B44]"
            >
              Edit Teacher
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditTeacher;
