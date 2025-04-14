import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAcademicYears } from "../AdminRedux/academicYearSlice";
import { fetchTerms, editTermAsync } from "../AdminRedux/termSlice";
import { toast } from "react-toastify";

const EditTermForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [termName, setTermName] = useState("");
  const [academicYear, setAcademicYear] = useState("");

  const academicYears = useSelector(
    (state) => state.academicYears.academicYears,
  );
  const terms = useSelector((state) => state.terms.terms);

  useEffect(() => {
    dispatch(fetchAcademicYears());
    dispatch(fetchTerms());
  }, [dispatch]);

  useEffect(() => {
    const termToEdit = terms.find((term) => term._id === id);
    if (termToEdit) {
      setTermName(termToEdit.semesterName || "");
      setAcademicYear(termToEdit.academicYear_id?.startYear?.toString() || "");
    }
  }, [terms, id]);

  const handleUpdateTerm = (e) => {
    e.preventDefault();

    if (!termName || !academicYear) {
      toast.error("Please fill in all fields");
      return;
    }

    const updatedData = {
      semesterName: termName,
      academicYear: academicYear, // استخدام academicYear بدلاً من academicYear_id
    };

    console.log("Data being sent to server:", updatedData); // تسجيل البيانات المرسلة

    dispatch(editTermAsync({ id, updatedData }))
      .unwrap()
      .then(() => {
        dispatch(fetchTerms()); // إعادة جلب البيانات من الخادم
        navigate(-1);
      })
      .catch((error) => {
        console.error("Error updating term:", error);
        toast.error(error.message || "Failed to update term");
      });
  };

  return (
    <div className="mx-auto mt-10 w-[80%]">
      <h1 className="pl-5 text-2xl font-semibold text-[#244856]">Edit Term</h1>
      <div className="ml-3 mt-1 h-[4px] w-[120px] rounded-t-md bg-[#244856]"></div>
      <div className="rounded-3xl bg-[#F5F5F5] p-6 shadow-md dark:bg-[#117C90]">
        <form onSubmit={handleUpdateTerm} className="m-6">
          {/* Term Dropdown */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-white">
              Select Term
            </label>
            <select
              value={termName}
              onChange={(e) => setTermName(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
            >
              <option value="">-- Select Term --</option>
              <option value="Semester 1">Semester 1</option>
              <option value="Semester 2">Semester 2</option>
            </select>
          </div>

          {/* Academic Year Dropdown */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-white">
              Select Academic Year
            </label>
            <select
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#117C90] dark:bg-[#117C90] dark:placeholder-white"
            >
              <option value="">-- Select Academic Year --</option>
              {academicYears.map((year, index) => (
                <option key={index} value={year.startYear}>
                  {year.startYear} - {year.endYear}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mx-auto block rounded-md bg-[#117C90] px-6 py-2 text-sm font-medium text-white transition hover:bg-[#0f6b7c] dark:bg-white dark:text-black"
          >
            Update Term
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditTermForm;
