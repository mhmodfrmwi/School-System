import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaTimes, FaPaperPlane } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchGrades } from "../../../Features/Admin/components/AdminRedux/gradeSlice";
import { fetchStudents } from "../../../Features/Admin/components/AdminRedux/studentSlice";
import { fetchManagers } from "../../../Features/Admin/components/AdminRedux/managerSlice";
import { fetchParents } from "../../../Features/Admin/components/AdminRedux/parentSlice";
import { fetchTeachers } from "../../../Features/Admin/components/AdminRedux/teacherSlice";
import { fetchAdmins } from "../../../Features/Admin/components/AdminRedux/adminSlice";
import { fetchClasses } from "../../../Features/Admin/components/AdminRedux/classSlice";
import { fetchClassTeacher } from "../../Teacher/components/TeacherRedux/TeacherClassSlice";
import { useNotificationService } from "../hooks/notification";
import { useClasses } from "../../..//Features/Manager/components/hooks/attendance";
import { useTranslation } from "react-i18next";

const NotificationForm = ({ onClose, currentUser }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const notificationTypes = [
    { value: "reminder", label: t("sendNotificationsForm.types.reminder") },
    { value: "alert", label: t("sendNotificationsForm.types.alert") },
    { value: "message", label: t("sendNotificationsForm.types.message") },
  ];

  const receiverModels = [
    { value: "Admin", label: t("sendNotificationsForm.receiverModels.Admin") },
    {
      value: "Teacher",
      label: t("sendNotificationsForm.receiverModels.Teacher"),
    },
    {
      value: "Student",
      label: t("sendNotificationsForm.receiverModels.Student"),
    },
    {
      value: "Parent",
      label: t("sendNotificationsForm.receiverModels.Parent"),
    },
    {
      value: "Manager",
      label: t("sendNotificationsForm.receiverModels.Manager"),
    },
  ];

  const endpointOptions = [
    {
      value: "",
      label: t("sendNotificationsForm.endpointOptions.specificUser"),
      requires: ["receiverId", "receiverModel"],
    },
    {
      value: "/students-in-same-grade",
      label: t("sendNotificationsForm.endpointOptions.sameGrade"),
      requires: ["gradeId"],
    },
    {
      value: "/students-in-same-class",
      label: t("sendNotificationsForm.endpointOptions.sameClass"),
      requires: ["classId"],
    },
    {
      value: "/all-students",
      label: t("sendNotificationsForm.endpointOptions.allStudents"),
      requires: [],
    },
  ];

  const dispatch = useDispatch();
  const { _id: userId, role, fullName } = useSelector((state) => state.login);

  // Conditional hook usage for manager role
  const useManagerClasses = () => {
    if (role === "manager") {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useClasses();
    }
    return { managerclasses: [], isLoading: false };
  };
  const managerClassesData = useManagerClasses();

  // Fetch all user types
  const { grades = [], loading: gradesLoading } = useSelector(
    (state) => state.grades,
  );
  const { students = [], loading: studentsLoading } = useSelector(
    (state) => state.students,
  );
  const { managers = [], loading: managersLoading } = useSelector(
    (state) => state.managers || {},
  );
  const { parents = [], loading: parentsLoading } = useSelector(
    (state) => state.parents || {},
  );
  const { admins = [], loading: adminsLoading } = useSelector(
    (state) => state.admins || {},
  );
  const { teachers = [], loading: teachersLoading } = useSelector(
    (state) => state.teachers || {},
  );

  // Get all possible class data sources
  const classTeacherData = useSelector((state) => state.classTeachers || {});
  const adminClassesData = useSelector((state) => state.classes || {});

  // Determine which classes to use based on role
  let classes = [];
  let classesLoading = false;

  if (role === "teacher") {
    classes = classTeacherData.classTeachers || [];
    classesLoading = classTeacherData.loading || false;
  } else if (role === "admin") {
    classes = adminClassesData.classes || [];
    classesLoading = adminClassesData.loading || false;
  } else if (role === "manager") {
    classes = managerClassesData.managerclasses || [];
    classesLoading = managerClassesData.isLoading || false;
  }

  useEffect(() => {
    dispatch(fetchGrades());
    dispatch(fetchStudents());
    dispatch(fetchManagers());
    dispatch(fetchParents());
    dispatch(fetchAdmins());
    dispatch(fetchTeachers());

    // Fetch classes based on role
    if (role === "teacher") {
      dispatch(fetchClassTeacher());
    } else if (role === "admin") {
      dispatch(fetchClasses());
    }
    // For manager, the useClasses hook will handle the fetching
  }, [dispatch, role]);

  const capitalizedRole = role
    ? role.charAt(0).toUpperCase() + role.slice(1)
    : "";
  const { sendNotification, isLoading, error, reset } =
    useNotificationService();

  const [formData, setFormData] = useState({
    sender: {
      id: userId || "",
      model: capitalizedRole || "",
    },
    content: "",
    type: "",
    receiverId: "",
    receiverModel: "",
    gradeId: "",
    classId: "",
  });

  const [selectedEndpoint, setSelectedEndpoint] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      const timer = setTimeout(() => reset(), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, reset]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "senderId" || name === "senderModel") {
      setFormData((prev) => ({
        ...prev,
        sender: {
          ...prev.sender,
          [name === "senderId" ? "id" : "model"]: value,
        },
      }));
    } else if (name === "receiverModel") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        receiverId: "",
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const getUsersByModel = (model) => {
    switch (model) {
      case "Admin":
        return admins.map((admin) => ({ id: admin._id, name: admin.fullName }));
      case "Teacher":
        return teachers.map((teacher) => ({
          id: teacher._id,
          name: teacher.fullName,
        }));
      case "Student":
        return students.map((student) => ({
          id: student._id,
          name: student.fullName,
          academic_number: student.academic_number,
        }));
      case "Parent":
        return parents.map((parent) => ({
          id: parent._id,
          name: parent.fullName,
        }));
      case "Manager":
        return managers.map((manager) => ({
          id: manager._id,
          name: manager.fullName,
        }));
      default:
        return [];
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpointConfig = endpointOptions.find(
      (opt) => opt.value === selectedEndpoint,
    );
    const requiredFields = [
      "sender.id",
      "sender.model",
      "content",
      "type",
      ...(endpointConfig?.requires || []),
    ];

    for (const field of requiredFields) {
      const value = field.includes(".")
        ? field.split(".").reduce((obj, key) => obj?.[key], formData)
        : formData[field];

      if (!value) {
        toast.error(t("sendNotificationsForm.errors.missingField", { field }));
        return;
      }
    }

    const dataToSend = {
      sender: {
        id: formData.sender.id,
        model: formData.sender.model,
      },
      content: formData.content,
      type: formData.type,
    };

    if (selectedEndpoint === "") {
      dataToSend.receiver = {
        id: formData.receiverId,
        model: formData.receiverModel,
      };
    } else if (selectedEndpoint === "/students-in-same-grade") {
      dataToSend.gradeId = formData.gradeId;
    } else if (selectedEndpoint === "/students-in-same-class") {
      dataToSend.classId = formData.classId;
    }

    try {
      await sendNotification({
        endpoint: selectedEndpoint,
        data: dataToSend,
      });
      toast.success(t("sendNotificationsForm.success"));
      onClose();
    } catch (err) {
      console.error("Error sending notification:", err);
      toast.error(t("sendNotificationsForm.error"));
    }
  };

  const renderClassSelect = () => {
    if (role === "manager") {
      return (
        <select
          name="classId"
          value={formData.classId}
          onChange={handleChange}
          required
          className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-[#117C90] focus:ring-[#117C90] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-[#0D5665] dark:focus:ring-[#0D5665]"
        >
          <option value="">{t("sendNotificationsForm.selectAClass")}</option>
          {classes.map((classItem) => (
            <option key={classItem._id} value={classItem._id}>
              {classItem.gradeId.gradeName}-{classItem.className}
            </option>
          ))}
        </select>
      );
    } else if (role === "admin") {
      return (
        <select
          name="classId"
          value={formData.classId}
          onChange={handleChange}
          required
          className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-[#117C90] focus:ring-[#117C90] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-[#0D5665] dark:focus:ring-[#0D5665]"
        >
          <option value="">{t("sendNotificationsForm.selectAClass")}</option>
          {classes.map((classItem) => (
            <option key={classItem._id} value={classItem._id}>
              {classItem.gradeId?.gradeName}-{classItem.className}
            </option>
          ))}
        </select>
      );
    } else if (role === "teacher") {
      return (
        <select
          name="classId"
          value={formData.classId}
          onChange={handleChange}
          required
          className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-[#117C90] focus:ring-[#117C90] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-[#0D5665] dark:focus:ring-[#0D5665]"
        >
          <option value="">{t("sendNotificationsForm.selectAClass")}</option>
          {classes.map((classItem) => {
            const classId = classItem.classId?._id;
            const className = `${classItem.gradeName}-${classItem.className}`;
            return (
              <option key={classId} value={classId}>
                {className}
              </option>
            );
          })}
        </select>
      );
    }
    return null;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="h-[75vh] w-[80vw] max-w-4xl rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-gray-600 dark:bg-gray-800"
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Header */}
        <div className="flex items-center justify-between rounded-t-xl bg-gradient-to-r from-[#117C90] to-[#0D5665] px-6 py-4 text-white dark:from-[#0D5665] dark:to-[#093D4A]">
          <div className="flex items-center gap-2">
            <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 p-2 text-white">
              <FaPaperPlane className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-medium">
              {t("sendNotificationsForm.title")}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-white hover:bg-white/20 focus:outline-none"
            title={t("sendNotificationsForm.cancel")}
          >
            <FaTimes />
          </button>
        </div>

        {/* Form Content */}
        <div className="h-[calc(100%-60px)] overflow-y-auto bg-gray-50 p-6 dark:bg-gray-800">
          {error && (
            <div className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-200">
              {error.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("sendNotificationsForm.senderName")}
                </label>
                <input
                  type="text"
                  name="senderName"
                  value={fullName || ""}
                  disabled
                  className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900 focus:border-[#117C90] focus:ring-[#117C90] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-[#0D5665] dark:focus:ring-[#0D5665]"
                />
                <input
                  type="hidden"
                  name="senderId"
                  value={formData.sender.id}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("sendNotificationsForm.senderRole")}
                </label>
                <input
                  type="text"
                  name="senderRoleDisplay"
                  value={capitalizedRole || ""}
                  disabled
                  className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900 focus:border-[#117C90] focus:ring-[#117C90] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-[#0D5665] dark:focus:ring-[#0D5665]"
                />
                <select
                  name="senderModel"
                  value={formData.sender.model}
                  onChange={handleChange}
                  className="hidden"
                >
                  <option value={capitalizedRole}>{capitalizedRole}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("sendNotificationsForm.notificationType")}
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-[#117C90] focus:ring-[#117C90] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-[#0D5665] dark:focus:ring-[#0D5665]"
              >
                <option value="">
                  {t("sendNotificationsForm.selectType")}
                </option>
                {notificationTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("sendNotificationsForm.recipientType")}
              </label>
              <select
                value={selectedEndpoint}
                onChange={(e) => setSelectedEndpoint(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-[#117C90] focus:ring-[#117C90] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-[#0D5665] dark:focus:ring-[#0D5665]"
              >
                {endpointOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("sendNotificationsForm.messageContent")}
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={4}
                required
                placeholder={t("sendNotificationsForm.enterMessage")}
                className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-[#117C90] focus:ring-[#117C90] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-[#0D5665] dark:focus:ring-[#0D5665]"
              />
            </div>

            {/* Conditional fields */}
            {selectedEndpoint === "" && (
              <>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t("sendNotificationsForm.receiverType")}
                  </label>
                  <select
                    name="receiverModel"
                    value={formData.receiverModel}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-[#117C90] focus:ring-[#117C90] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-[#0D5665] dark:focus:ring-[#0D5665]"
                  >
                    <option value="">
                      {t("sendNotificationsForm.selectReceiverType")}
                    </option>
                    {receiverModels.map((model) => (
                      <option key={model.value} value={model.value}>
                        {model.label}
                      </option>
                    ))}
                  </select>
                </div>

                {formData.receiverModel && (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t("sendNotificationsForm.selectUser", {
                        userType: formData.receiverModel,
                      })}
                    </label>
                    <select
                      name="receiverId"
                      value={formData.receiverId}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-[#117C90] focus:ring-[#117C90] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-[#0D5665] dark:focus:ring-[#0D5665]"
                    >
                      <option value="">
                        {t("sendNotificationsForm.selectUser", {
                          userType: formData.receiverModel.toLowerCase(),
                        })}
                      </option>
                      {getUsersByModel(formData.receiverModel).map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name} {user.academic_number}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </>
            )}

            {selectedEndpoint === "/students-in-same-grade" && (
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("sendNotificationsForm.selectGrade")}
                </label>
                <select
                  name="gradeId"
                  value={formData.gradeId}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-[#117C90] focus:ring-[#117C90] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-[#0D5665] dark:focus:ring-[#0D5665]"
                >
                  <option value="">
                    {t("sendNotificationsForm.selectAGrade")}
                  </option>
                  {grades.map((grade) => (
                    <option key={grade._id} value={grade._id}>
                      {grade.gradeName}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {selectedEndpoint === "/students-in-same-class" && (
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("sendNotificationsForm.selectClass")}
                </label>
                {renderClassSelect()}
              </div>
            )}

            <div
              className={`flex ${isRTL ? "flex-row-reverse" : ""} justify-end gap-3 pt-4`}
            >
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-[#117C90]/50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-[#0D5665]/50"
              >
                {t("sendNotificationsForm.cancel")}
              </button>
              <button
                type="submit"
                disabled={
                  isLoading ||
                  gradesLoading ||
                  classesLoading ||
                  studentsLoading ||
                  managersLoading ||
                  parentsLoading ||
                  adminsLoading ||
                  teachersLoading
                }
                className="flex items-center gap-2 rounded-lg bg-[#117C90] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#0D5665] focus:outline-none focus:ring-4 focus:ring-[#117C90]/50 dark:bg-[#0D5665] dark:hover:bg-[#093D4A] dark:focus:ring-[#0D5665]/50"
              >
                {isLoading ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {t("sendNotificationsForm.sending")}
                  </>
                ) : (
                  <>
                    <FaPaperPlane size={14} />
                    {t("sendNotificationsForm.sendNotification")}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NotificationForm;
