import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editParentAsync } from "../AdminRedux/parentSlice";

const EditParentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { parents} = useSelector((state) => state.parents);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    students: [],
  });

  useEffect(() => {
    const parent = parents.find((parent) => parent._id === id);
    if (parent) {
      setFormData({
        fullName: parent.fullName,
        email: parent.email,
        phone: parent.phone,
        password: parent.password,
        gender: parent.gender,
      });
    }
  }, [id, parents]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = {
      ...formData,
      students: [],
    };

    dispatch(editParentAsync({ id, updatedParent: updatedData }))
      .unwrap()
      .then(() => {
        navigate("/admin/allparents");
      })
      .catch((error) => {
      });
  };
  return (
    <div className="relative mx-auto my-10 w-[80%] font-poppins">
      <div className="mb-6">
        <h2 className="font-poppins text-2xl font-semibold text-[#244856]">
          Edit Parent
        </h2>
        <div className="mt-1 h-[4px] w-[155px] rounded-t-md bg-[#244856]"></div>
      </div>
      <div className="rounded-3xl bg-[#F5F5F5] p-6 shadow-md">
        <form
          onSubmit={handleSubmit}
          className="m-6 grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="my-2 block font-semibold text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="my-2 block font-semibold text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            />
          </div>

          <div>
            <label className="my-2 block font-semibold text-gray-700">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            >
              <option value="" disabled className="font-poppins">
                Select gender
              </option>
              <option value="M" className="font-poppins">
                M
              </option>
              <option value="F" className="font-poppins">
                F
              </option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="phone"
              className="my-2 block font-semibold text-gray-700"
            >
              phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
            />
          </div>

          <div className="mb-2">
            <label className="my-2 block font-semibold text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-2xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              placeholder="Enter password"
              required
            />
          </div>

          <div className="col-span-1 flex justify-end gap-4 sm:col-span-2">
            <button
              type="submit"
              className="rounded-md bg-[#117C90] px-6 py-2 font-medium text-white transition hover:bg-[#0f6b7c]"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditParentForm;
