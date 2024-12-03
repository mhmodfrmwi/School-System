import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postTeacher, addTeachertoServer } from "../AdminRedux/addteacherSlice"; // تأكد من تعديل المسار حسب مشروعك


function TeacherForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    gender: "",
    classes: [], // This will hold an array of selected classes
    subjects: [""], // This will hold an array of subjects, starting with one empty string
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleClassChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevState) => {
      const updatedClasses = checked
        ? [...prevState.classes, value] 
        : prevState.classes.filter((c) => c !== value); 
      return { ...prevState, classes: updatedClasses };
    });
  };

  const handleSubjectChange = (index, e) => {
    const { value } = e.target;
    const updatedSubjects = formData.subjects.map((subject, i) =>
      i === index ? value : subject
    );
    setFormData({ ...formData, subjects: updatedSubjects });
  };

  const addSubject = () => {
    setFormData((prevState) => ({
      ...prevState,
      subjects: [...prevState.subjects, ""],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.password) return;

    dispatch(
      postTeacher({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phoneNumber,
        gender: formData.gender,
        SSN: "30403131700795", // Dummy value
        subject: formData.subjects[0],
        password: formData.password,
        classes: formData.classes,
        role: "Teacher", // يمكن تعديل الدور إذا كان مطلوبًا
      })
    );

    dispatch(
      addTeachertoServer(
        formData.fullName,
        formData.email,
        formData.password,
        formData.phoneNumber,
        formData.gender,
        formData.classes,
        formData.subjects[0], 
      )
    );

    console.log("Form Submitted", formData);

    // Reset form
    setFormData({
      fullName: "",
      email: "",
      password: "",
      phoneNumber: "",
      gender: "",
      classes: [],
      subjects: [""],
    });
  };

  return (
    <>
      <div className="mb-6 ms-20 mt-10 w-52 md:ms-24">
        <h2 className="font-poppins text-3xl font-bold text-[#043B44]">
          Add Teacher
        </h2>
        <p className="mt-3 rounded-2xl border-b-4 border-[#117C90]"></p>
      </div>

      <div className="mx-auto w-[95%] max-w-4xl rounded-lg bg-gray-100 p-14 shadow-md">
        <form onSubmit={handleSubmit}>
          {/* الحقول الأساسية */}
          <div className="mb-4">
            <label className="block mb-2 font-poppins text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block mb-2 font-poppins text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                placeholder="Enter email address"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-poppins text-gray-700">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full p-2 border rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              >
                <option value="" disabled>
                  Select gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
            <div>
              <label className="block mb-2 font-poppins text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                placeholder="Enter password"
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-poppins text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-2 border rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
                placeholder="Enter phone number"
                required
              />
            </div>
          </div>

         
          <div className="mt-4">
            <label className="block mb-2 font-poppins text-gray-700">
              Classes
            </label>
            <div className="flex flex-wrap gap-4">
              {["A", "B", "C"].map((className) => (
                <label key={className} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    value={className}
                    checked={formData.classes.includes(className)}
                    onChange={handleClassChange}
                    className="form-checkbox text-[#117C90]"
                  />
                  <span>{className}</span>
                </label>
              ))}
            </div>
          </div>

          {/* الحقول الخاصة بالمواد */}
          <div className="mt-6">
            {formData.subjects.map((subject, index) => (
              <div key={index} className="grid grid-cols-1 mt-4">
                <label className="block mb-2 font-poppins text-gray-700">
                  Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => handleSubjectChange(index, e)}
                  className="w-full p-2 border rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
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
            ))}
            <button
              type="button"
              onClick={addSubject}
              className="mt-4 text-[#117C90] hover:underline"
            >
              + Add another subject
            </button>
          </div>

          {/* زر الإرسال */}
          <div className="mt-8">
            <button
              type="submit"
              className="w-full p-2 bg-[#117C90] text-white rounded-md hover:bg-[#043B44]"
            >
              Add Teacher
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default TeacherForm;



