import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTeachers } from "../../../Admin/components/AdminRedux/teacherSlice"; 
import { postTrips } from "../TeacherRedux/TripsSlice"; // Add class teacher

function ActivityForm() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    teacherId: "",
    startDate: "",
    endDate: "",
    numberOfSeats: "",
    fees: "",
    requirements: "",
  });

  const { teachers } = useSelector((state) => state.teachers);
  
  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(formData); // Log the form data
      dispatch(postTrips(formData));
      setFormData({
        title: "",
        teacherId: "",
        startDate: "",
        endDate: "",
        numberOfSeats: "",
        fees: "",
        requirements: "",
      });
    };


  return (
    <div className="relative mx-auto my-10 w-[80%] font-poppins">
      <h1 className="pl-5 text-2xl font-semibold text-[#244856]">Add Activity</h1>
      <div className="ml-3 mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856]"></div>
      <div className="rounded-3xl bg-[#F5F5F5] p-6 shadow-md">
        <form onSubmit={handleSubmit} className="m-6 ">
          {/* Activity Name */}
          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">
              Activity Name *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            />
          </div>

          {/* Start Date */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            />
          </div>

          {/* End Date */}
          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              required
            />
          </div>

          {/* Fees */}
          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">
              Fees
            </label>
            <input
              type="number"
              name="fees"
              value={formData.fees}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              placeholder="Enter fees"
            />
          </div>

          {/* Number of Seats */}
          <div className="mb-4">
            <label className="text-md mb-2 block font-medium text-gray-700">
              Number of Seats
            </label>
            <input
              type="number"
              name="numberOfSeats"
              value={formData.numberOfSeats}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              placeholder="Enter number of seats"
            />
          </div>
         </div>
          {/* Requirements */}
          <div className="mb-4 sm:col-span-2">
            <label className="text-md mb-2 block font-medium text-gray-700">
              Requirements
            </label>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              rows="4"
              placeholder="Write here your requirements..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="col-span-1 mt-6 sm:col-span-2">
            <button
              type="submit"
              className="mx-auto block rounded-md bg-[#117C90] px-6 py-2 font-medium text-white transition hover:bg-[#0f6b7c]"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ActivityForm;
