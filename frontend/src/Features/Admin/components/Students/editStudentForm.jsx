import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGrades } from "../AdminRedux/gradeSlice";
import { fetchStudents, editStudent } from "../AdminRedux/studentSlice"; // افترضنا وجود دالة لجلب وتحديث الطالب
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function EditStudent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); 
  const { grade } = useSelector((state) => state.grades);
  const { student } = useSelector((state) => state.students); 

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
    if (student) {
      setStudentData({
        fullName: student.fullName || "", 
        emailAddress: student.email || "",
        phoneNumber: student.phone || "",
        password: student.password || "",
        dateOfBirth: student.dateOfBirth || "",
        gender: student.gender || "",
        grade: student.gradeName || "",
        address: student.address || "",
      });
    }
  }, [student]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleEditStudent = (e) => {
    e.preventDefault();

    dispatch(editStudent({ id, studentData }))
      .unwrap()
      .then(() => {
        toast.success("Student updated successfully!");
        navigate("/admin/allstudent"); 
      })
      .catch((error) => {
        console.error(error || "Failed to update student");
      });
  };

  return (
    <div className="w-[80%] mx-auto my-10 font-poppins">
      <h1 className="text-2xl font-semibold text-[#244856] pl-5">Edit Student</h1>
      <div className="mt-1 h-[4px] w-[160px] rounded-t-md bg-[#244856] ml-3"></div>
      <div className="bg-[#F5F5F5] shadow-md p-6 rounded-3xl">
        <form onSubmit={handleEditStudent} className="grid grid-cols-1 sm:grid-cols-2 gap-4 m-6">
          {Object.keys(studentData).map((key) => (
            <div className="mb-4" key={key}>
              <label className="block text-md font-medium text-gray-700 mb-2 capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </label>
              {key === "gender" ? (
                <select
                  name={key}
                  value={studentData[key]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90] z-10"
                >
                  <option value=""> Select Grade </option>
                  {grade.map((g, index) => (
                    <option key={index} value={g.gradeName}>
                      {g.gradeName}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={key === "password" ? "password" : key === "dateOfBirth" ? "date" : "text"}
                  name={key}
                  value={studentData[key]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                  placeholder={`Enter ${key.replace(/([A-Z])/g, " $1")}`}
                />
              )}
            </div>
          ))}

          <div className="col-span-1 sm:col-span-2">
            <button
              type="submit"
              className="px-6 py-2 bg-[#117C90] text-white rounded-md text-md font-medium hover:bg-[#0f6b7c] transition mx-auto block"
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
