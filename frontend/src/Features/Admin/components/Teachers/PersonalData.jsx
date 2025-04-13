import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postTeacher } from "../AdminRedux/teacherSlice";
import { fetchSubjects } from "../AdminRedux/subjectSlice";

function AddTeacher() {
  const dispatch = useDispatch();
  const { subjects, loading } = useSelector((state) => state.subject);

  const [teacherData, setTeacherData] = useState({
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
    // Fetch subjects when the component is mounted
    dispatch(fetchSubjects());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacherData({ ...teacherData, [name]: value });
  };

  const handleAddTeacher = (e) => {
    e.preventDefault();

    // إرسال البيانات باستخدام postTeacher
    dispatch(postTeacher(teacherData))
      .unwrap()
      .then(() => {
        setTeacherData({
          fullName: "",
          dateOfBirth: "",
          gender: "",
          address: "",
          phone: "",
          email: "",
          subject: "",
          password: "",
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="mx-auto my-10 w-[80%] font-poppins">
      <h1 className="pl-5 text-2xl font-semibold text-[#244856]">
        Add Teacher
      </h1>
      <div className="ml-3 mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856]"></div>
      <div className="rounded-3xl bg-[#F5F5F5] p-6 shadow-md dark:bg-[#117C90]">
        <form
          onSubmit={handleAddTeacher}
          className="m-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {Object.keys(teacherData).map((key) => (
            <div className="mb-4" key={key}>
              <label className="text-md mb-2 block font-medium capitalize text-gray-700 dark:text-white">
                {key.replace(/([A-Z])/g, " $1")}
              </label>
              {key === "gender" ? (
                <select
                  name={key}
                  value={teacherData[key]}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
                >
                  <option value="">Select Gender</option>
                  <option value="M">Male</option>
                  <option value="F">Female</option>
                </select>
              ) : key === "subject" ? (
                <select
                  name={key}
                  value={teacherData[key]}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
                >
                  <option value="">Select Subject</option>
                  {loading ? (
                    <option disabled>Loading subjects...</option>
                  ) : (
                    subjects.map((subject) => (
                      <option key={subject._id} value={subject.subjectName}>
                        {subject.subjectName}
                      </option>
                    ))
                  )}
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
                  value={teacherData[key]}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
                  placeholder={`Enter ${key.replace(/([A-Z])/g, " $1")}`}
                />
              )}
            </div>
          ))}

          <div className="col-span-1 sm:col-span-2">
            <button
              type="submit"
              className="text-md mx-auto block rounded-md bg-[#117C90] px-6 py-2 font-medium text-white transition hover:bg-[#0f6b7c] dark:bg-white dark:text-black"
            >
              Add Teacher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTeacher;
