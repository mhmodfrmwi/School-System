import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion"; 
import { setRole } from "../../Features/Auth/AuthRedux/roleSlice";
import { useTranslation } from "react-i18next";
import Toggles from "./Toggles";
import logo from "../../assets/logoorangee 1.png";

const ChooseRole = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleRoleSelect = useCallback(
    (role) => {
      dispatch(setRole(role));
      localStorage.removeItem("token");
      navigate("/login");
    },
    [dispatch, navigate],
  );

  const roles = useMemo(
    () => [
      { label: t("dashboardadmin.users.admin"), icon: "⚙️", api: "admin" },
      { label: t("dashboardadmin.users.manager"), icon: "👔", api: "manager" },
      { label: t("dashboardadmin.users.teacher"), icon: "👩‍🏫", api: "teacher" },
      { label: t("dashboardadmin.users.parent"), icon: "👨‍👩‍👧", api: "parent" },
      { label: t("dashboardadmin.users.student"), icon: "🎓", api: "student" },
    ],
    [t],
  );

  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, 
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
  };

  return (
    <div className="flex h-screen items-center justify-center overflow-y-scroll bg-[#FEDDC6] font-poppins dark:bg-[#13082F]">
      <div className="absolute right-12 top-5">
        <Toggles />
      </div>

      <div className="flex h-full w-full flex-col items-center rounded-lg mt-[150px]">
        <motion.div
          variants={logoVariants}
          initial="hidden"
          animate="visible"
        >
          <img
            src={logo}
            alt="Logo"
            className="mx-auto px-6 h-[100px] md:h-[150px]"
          />
        </motion.div>
        <motion.p
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="mb-16 mt-6 px-6 text-center text-3xl font-semibold text-orange-500 dark:text-[#E0AAEE] md:px-28 md:text-3xl"
        >
          {t("chooseRole.title")}
        </motion.p>

        <motion.div
          dir="ltr"
          className="grid grid-cols-2 gap-10 p-2 pb-16 md:grid-cols-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {roles.map((role, index) => (
            <motion.button
              key={index}
              aria-label={`Select ${role.label}`}
              className="flex flex-col items-center rounded-lg border-2 border-orange-500 bg-white p-8 text-center text-orange-500 transition-colors hover:bg-[#f3ceb4] hover:text-white dark:border-[#AE45FB] dark:bg-[#281459] dark:text-[#E0AAEE] dark:hover:bg-[#3A1D7A] md:p-12"
              onClick={() => handleRoleSelect(role.api)}
              variants={itemVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            >
              <span className="mb-2 text-3xl">{role.icon}</span>
              <span className="font-semibold">{role.label}</span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ChooseRole;