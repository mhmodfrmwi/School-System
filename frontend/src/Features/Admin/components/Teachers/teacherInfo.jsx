import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function TeacherInfo() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    teacherName: "",
    subject: "",
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

    if (!formData.name || !formData.subject) return;

    // dispatch();
    // postTeacher({
    //   name: formData.name,
    //   SSN: "30403131700795", // Dummy value
    //   subject: formData.subjects[0],
    //   password: formData.password,
    //   classes: formData.classes,
    //   role: "Teacher",
    // }),

    // dispatch();
    // addTeachertoServer(formData.name, formData.classes, formData.subjects[0]),

    setFormData({
      name: "",
      subject: "",
      assignTeacher: [{ grade: "", class: "" }],
    });
  };
  return (
    <>
      <div className="m-auto grid w-[90%] grid-cols-1 gap-1 rounded-3xl bg-gray-100 sm:grid-cols-2">
        <button
          className="flex cursor-pointer items-center justify-center rounded-3xl bg-[##EFEFEF] py-2 font-medium text-[#117C90] focus:bg-[#117C90] focus:outline-none"
          onClick={() => navigate("/admin/teacherform")}
        >
          <span className="mr-2 flex w-6 items-center justify-center rounded-full bg-[#117C90] text-white">
            1
          </span>
          Personal data
        </button>

        <button
          className="flex cursor-pointer items-center justify-center rounded-3xl bg-[##EFEFEF] bg-[#117C90] py-2 font-medium text-white focus:outline-none"
          onClick={() => navigate("/admin/teacherinfo")}
        >
          <span className="mr-2 flex w-6 items-center justify-center rounded-full bg-white text-[#117C90]">
            2
          </span>
          Academic data
        </button>
      </div>

      <div className="mb-6 ms-20 mt-6">
        <h2 className="w-80 font-poppins text-3xl font-bold text-[#043B44]">
          Assign Teacher Info
        </h2>
        <p className="mt-3 w-52 rounded-2xl border-b-4 border-[#117C90]"></p>
      </div>
      <div className="mx-auto w-[95%] max-w-4xl rounded-lg bg-gray-100 p-14 shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mt-6">
            <div className="mt-4 grid grid-cols-1">
              <label className="mb-2 block font-semibold text-[#117C90]">
                Select Teacher
              </label>
              <select
                value={formData.teacherName}
                onChange={handleChange}
                name="teacherName"
                className="w-full rounded-2xl border p-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#117C90]"
              >
                <option value="" disabled>
                  Select Teacher
                </option>
                <option value="Ahmed">ahmed</option>
                <option value="Mohamed">mohamed</option>
                <option value="Ali">ali</option>
                <option value="Elsayed">elsayed</option>
                <option value="Mohmoud">mahmoud</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <div className="mt-4 grid grid-cols-1">
              <label className="mb-2 block font-semibold text-[#117C90]">
                Subject
              </label>
              <select
                value={formData.subject}
                onChange={handleChange}
                name="subject"
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
                  <label className="mb-2 block font-poppins text-gray-700">
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
              className="w-32 rounded-2xl bg-[#117C90] p-2 text-white hover:bg-[#043B44]"
            >
              Add Teacher
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default TeacherInfo;
