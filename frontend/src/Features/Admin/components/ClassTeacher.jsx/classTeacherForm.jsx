import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Loader from "@/ui/Loader";
import { postClassTeacher } from "../AdminRedux/classTeacherSlice";

function ClassTeacherForm() {
  const dispatch = useDispatch();
  // const { classesTeacher, loading } = useSelector(
  //   (state) => state.classTeacher,
  // );
  const [formData, setFormData] = useState({
    className: "",
    subjectName: "",
    teacherName: "",
    academicYear: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.className || !formData.subjectName || !formData.teacherName) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please fill in all required fields.",
      });
      return;
    }
    // const emailExists = classesTeacher.some(
    //   (classTeacher) =>
    //     classTeacher.email.toLowerCase() === formData.email.toLowerCase(),
    // );

    // if (emailExists) {
    //   Swal.fire(
    //     "Error",
    //     "Email already exists. Please use another email.",
    //     "error",
    //   );
    //   return;
    // }
    try {
      await dispatch(
        postClassTeacher({
          className: formData.className,
          subjectName: formData.subjectName,
          teacherName: formData.teacherName,
          academicYear: formData.academicYear,
        }),
      );

      setFormData({
        classTeacher: "",
        subjectName: "",
        teacherName: "",
        academicYear: "",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.message || "An error occurred while submitting the form.",
      });
    }
  };

  return (
    <div className="relative">
      {/* {loading && <Loader />} */}
      <div className="mb-8 ms-10 mt-6">
        <h2 className="font-poppins text-2xl font-bold text-[#043B44]">
          Add classTeacher
        </h2>
        <p className="mt-3 w-32 rounded-2xl border-b-4 border-[#117C90]"></p>
      </div>

      <div className="mx-auto w-[95%] max-w-4xl rounded-2xl bg-gray-100 p-14 shadow-md">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block font-semibold text-[#117C90]">
              className
            </label>
            <select
              value={formData.className}
              name="className"
              onChange={handleChange}
              placeholder="Enter class name"
              required
              className="w-full rounded-2xl border p-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="" disabled>
                Select className
              </option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-semibold text-[#117C90]">
              subjectName
            </label>
            <select
              value={formData.subjectName}
              name="subjectName"
              onChange={handleChange}
              placeholder="Enter subject name"
              required
              className="w-full rounded-2xl border p-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="" disabled>
                Select Subject name
              </option>
              <option value="Arabic">Arabic</option>
              <option value="English">English</option>
              <option value="Franch">Franch</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-semibold text-[#117C90]">
              Teacher Name
            </label>
            <select
              value={formData.teacherName}
              name="teacherName"
              onChange={handleChange}
              placeholder="Enter teacher name"
              required
              className="w-full rounded-2xl border p-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="" disabled>
                Select teacherName
              </option>
              <option value="ahmed">ahmed</option>
              <option value="ali">ali</option>
              <option value="omar">omar</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block font-semibold text-[#117C90]">
              academicYear
            </label>
            <select
              value={formData.academicYear}
              name="academicYear"
              onChange={handleChange}
              placeholder="Enter academic name"
              required
              className="w-full rounded-2xl border p-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="" disabled>
                Select academicYear
              </option>
              <option value="2022-2023">2022-2023</option>
              <option value="2023-2024">2023-2024</option>
              <option value="2024-2025">2024-2025</option>
            </select>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="w-52 rounded-2xl bg-[#117C90] p-2 text-white hover:bg-[#043B44]"
            >
              Add classTeacher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ClassTeacherForm;
