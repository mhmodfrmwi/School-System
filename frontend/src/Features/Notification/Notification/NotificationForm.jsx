import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaTimes, FaPaperPlane } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../../../Features/Admin/components/AdminRedux/studentSlice";
import { fetchManagers } from "../../../Features/Admin/components/AdminRedux/managerSlice";
import { fetchParents } from "../../../Features/Admin/components/AdminRedux/parentSlice";
import { fetchTeachers } from "../../../Features/Admin/components/AdminRedux/teacherSlice";
import { fetchAdmins } from "../../../Features/Admin/components/AdminRedux/adminSlice";
import { useNotificationService } from "../hooks/notification";

const notificationTypes = [
  { value: "reminder", label: "Reminder" },
  { value: "alert", label: "Alert" },
  { value: "message", label: "Message" },
];

const receiverModels = [
  { value: "Admin", label: "Admin" },
  { value: "Teacher", label: "Teacher" },
  { value: "Student", label: "Student" },
  { value: "Parent", label: "Parent" },
  { value: "Manager", label: "Manager" },
];

const NotificationForm = ({ onClose, currentUser }) => {
  const dispatch = useDispatch();
  const { _id: userId, role, fullName } = useSelector((state) => state.login);

  // Fetch all user types
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

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchManagers());
    dispatch(fetchParents());
    dispatch(fetchAdmins());
    dispatch(fetchTeachers());
  }, [dispatch]);

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
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message);
      const timer = setTimeout(() => reset(), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, reset]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "receiverModel") {
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

    if (
      !formData.sender.id ||
      !formData.sender.model ||
      !formData.content ||
      !formData.type ||
      !formData.receiverId ||
      !formData.receiverModel
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    const dataToSend = {
      sender: {
        id: formData.sender.id,
        model: formData.sender.model,
      },
      content: formData.content,
      type: formData.type,
      receiver: {
        id: formData.receiverId,
        model: formData.receiverModel,
      },
    };

    try {
      await sendNotification({
        endpoint: "",
        data: dataToSend,
      });
      toast.success("Notification sent successfully!");
      onClose();
    } catch (err) {
      console.error("Error sending notification:", err);
      toast.error("Failed to send notification");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="h-[75vh] w-[80vw] max-w-4xl rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-gray-600 dark:bg-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between rounded-t-xl bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] px-6 py-4 text-white dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]">
          <div className="flex items-center">
            <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 p-2 text-white">
              <FaPaperPlane className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-medium">Send Notification</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-white hover:bg-white/20 focus:outline-none"
            title="Close"
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
                  Sender Name
                </label>
                <input
                  type="text"
                  name="senderName"
                  value={fullName || ""}
                  disabled
                  className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900 focus:border-[#FD813D] focus:ring-[#FD813D] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-[#CE4EA0] dark:focus:ring-[#CE4EA0]"
                />
                <input
                  type="hidden"
                  name="senderId"
                  value={formData.sender.id}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Sender Role
                </label>
                <input
                  type="text"
                  name="senderRoleDisplay"
                  value={capitalizedRole || ""}
                  disabled
                  className="block w-full rounded-lg border border-gray-300 bg-gray-100 p-2.5 text-sm text-gray-900 focus:border-[#FD813D] focus:ring-[#FD813D] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-[#CE4EA0] dark:focus:ring-[#CE4EA0]"
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
                Notification Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-[#FD813D] focus:ring-[#FD813D] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-[#CE4EA0] dark:focus:ring-[#CE4EA0]"
              >
                <option value="">Select a type</option>
                {notificationTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Receiver Type
              </label>
              <select
                name="receiverModel"
                value={formData.receiverModel}
                onChange={handleChange}
                required
                className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-[#FD813D] focus:ring-[#FD813D] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-[#CE4EA0] dark:focus:ring-[#CE4EA0]"
              >
                <option value="">Select receiver type</option>
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
                  Select {formData.receiverModel}
                </label>
                <select
                  name="receiverId"
                  value={formData.receiverId}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-[#FD813D] focus:ring-[#FD813D] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-[#CE4EA0] dark:focus:ring-[#CE4EA0]"
                >
                  <option value="">
                    Select a {formData.receiverModel.toLowerCase()}
                  </option>
                  {getUsersByModel(formData.receiverModel).map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Message Content
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={4}
                required
                placeholder="Enter your notification message..."
                className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-[#FD813D] focus:ring-[#FD813D] dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-[#CE4EA0] dark:focus:ring-[#CE4EA0]"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-[#FD813D]/50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-600 dark:focus:ring-[#CE4EA0]/50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  isLoading ||
                  studentsLoading ||
                  managersLoading ||
                  parentsLoading ||
                  adminsLoading ||
                  teachersLoading
                }
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] px-5 py-2.5 text-sm font-medium text-white hover:from-[#FD813D]/90 hover:via-[#CF72C0]/90 hover:to-[#BC6FFB]/90 focus:outline-none focus:ring-4 focus:ring-[#FD813D]/50 dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] dark:hover:from-[#CE4EA0]/90 dark:hover:via-[#BF4ACB]/90 dark:hover:to-[#AE45FB]/90 dark:focus:ring-[#CE4EA0]/50"
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
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane size={14} />
                    Send Notification
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
