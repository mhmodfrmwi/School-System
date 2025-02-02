import React, { useState } from "react";

const MaterialForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    link: "",
    grade: "",
    subject: "",
    academicYear: "",
    semester: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <>
    <div className="flex flex-col w-[80%]  mx-auto px-4 md:px-6 lg:px-0 ">
    <h1 className="text-lg  font-poppins  font-semibold text-[#244856] sm:text-xl lg:text-2xl">
    Upload Material
    </h1>
    <div className="mt-1 h-[3px] w-[100px] rounded-t-md bg-[#244856] lg:h-[4px] lg:w-[140px]"></div>
</div>
    <div className=" mx-auto w-[80%] p-6 bg-gray-100 rounded-xl shadow-md">    
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-poppins font-medium">Title <span className="text-red-500">*</span></label>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            className="w-full font-poppins px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]" 
            required
          />
        </div>
        <div>
          <label className="block font-poppins font-medium">Description </label>
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            className="w-full font-poppins px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]" 
            required
          />
        </div>
        <div>
          <label className="block font-poppins font-medium">Type</label>
          <select name="type" value={formData.type} onChange={handleChange} 
          className="w-full font-poppins px-4 py-2 border text-gray-500 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]">
            <option value="">Select Type</option>
            <option value="pdf">PDF</option>
            <option value="video">Video</option>
            <option value="document">Document</option>
          </select>
        </div>
        <div>
          <label className="block font-poppins font-medium">Link</label>
          <input 
            type="text" 
            name="link" 
            value={formData.link} 
            onChange={handleChange} 
            className="w-full font-poppins px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-poppins font-medium">Grade</label>
            <select name="grade" value={formData.grade} onChange={handleChange} 
            className="w-full font-poppins px-4 py-2 border text-gray-500 border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]">
              <option value="">Select Grade</option>
              <option value="1">Grade 1</option>
              <option value="2">Grade 2</option>
            </select>
          </div>
          <div>
            <label className="block font-poppins font-medium">Subject</label>
            <select name="subject" value={formData.subject} onChange={handleChange} 
            className="w-full font-poppins px-4 py-2 text-gray-500 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]">
              <option value="">Select Subject</option>
              <option value="math">Math</option>
              <option value="science">Science</option>
            </select>
          </div>
        </div>
        <div className="grid font-poppins grid-cols-2 gap-4">
          <div>
            <label className="block font-poppins font-medium">Academic Year</label>
            <select name="academicYear" value={formData.academicYear} onChange={handleChange} 
            className="w-full font-poppins px-4 py-2 text-gray-500 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]">
              <option value="">Select Year</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
            </select>
          </div>
          <div>
            <label className="block font-poppins font-medium">Semester</label>
            <select name="semester" value={formData.semester} onChange={handleChange} 
            className="w-full font-poppins text-gray-500 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#117C90]">
              <option value="">Select Semester</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
            </select>
          </div>
        </div>
        <button type="submit"  className="px-6 py-2 bg-[#117C90] text-white font-poppins rounded-md text-md font-medium hover:bg-[#0f6b7c] transition mx-auto block">
        Upload</button>
      </form>
    </div>
    </>
  );
};

export default MaterialForm;
