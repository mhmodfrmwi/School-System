import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import logo from "../../assets/logoooo 1.png";
import student1 from "../../assets/student1.png";
import student2 from "../../assets/student2.png";
import student3 from "../../assets/student3.png";
import student4 from "../../assets/student4.png";
import img4 from "../../assets/footerOnboarding.png";
import img5 from "../../assets/logo.png";
import infrastructureIcon from "../../assets/infrastructure.webp";
import calendarIcon from "../../assets/calendarSetup.webp";
import timetableIcon from "../../assets/timetableDesign.webp";
import curriculumIcon from "../../assets/curriculumProgress.webp";
import analyticsIcon from "../../assets/analytics.webp";
import userManagementIcon from "../../assets/userManagement.webp";
import onboardingsection3 from "../../assets/onboardingsection3.png";
import ThemeSwitcher from "@/ui/ThemeSwitcher";

function Toggles({ lang, toggleLanguage }) {
  return (
    <div className="flex items-center">
      <button
        onClick={toggleLanguage}
        className="flex items-center justify-center rounded-full bg-gradient-to-r from-[#CE4EA0] via-[#BF4ACB] to-[#AE45FB] px-4 py-2 font-poppins text-sm text-white"
      >
        {lang === "en" ? "العربية" : "English"}
      </button>
    </div>
  );
}

function Onboarding() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const digitalRef = useRef(null);
  const solutionsRef = useRef(null);
  const superpowerRef = useRef(null);
  const menuRef = useRef(null);
  const [circleStyles, setCircleStyles] = useState({
    green: { top: "5%", left: "5%" },
    blue: { bottom: "5%", left: "5%" },
    red: { bottom: "5%", right: "5%" },
  });
  const [lang, setLang] = useState(i18n.language);


  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { ref: solutionsInViewRef, inView: solutionsInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const { ref: superpowerInViewRef, inView: superpowerInView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const setDigitalRefs = (node) => {
    digitalRef.current = node;
    inViewRef(node);
  };

  const setSolutionsRefs = (node) => {
    solutionsRef.current = node;
    solutionsInViewRef(node);
  };

  const setSuperpowerRefs = (node) => {
    superpowerRef.current = node;
    superpowerInViewRef(node);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };


  const toggleLanguage = () => {
    const newLang = lang === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    setLang(newLang);
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 640) {
        setCircleStyles({
          green: { top: "12%", left: "19%" },
          blue: { bottom: "24%", left: "3%" },
          red: { bottom: "11%", right: "25%" },
        });
      } else if (width <= 768) {
        setCircleStyles({
          green: { top: "12%", left: "25%" },
          blue: { bottom: "24%", left: "3%" },
          red: { bottom: "11%", right: "21%" },
        });
      } else {
        setCircleStyles({
          green: { top: "16%", left: "25%" },
          blue: { bottom: "25%", left: "4%" },
          red: { bottom: "14%", right: "15%" },
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (ref, e) => {
    if (e) e.preventDefault();
    ref.current.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.addEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="min-h-screen font-['Poppins'] dark:bg-[#13082F]"
      dir={i18n.language === "ar" ? "rtl" : "ltr"}
    >
      {/* Navigation Bar */}
      <nav
        className={`fixed z-50 w-full border-b border-gray-300 transition-colors duration-200 ${isScrolled ? "bg-white shadow dark:bg-[#13082F] dark:shadow-[0_4px_15px_rgba(224,170,238,0.3)]" : "bg-[#EEE8F6] dark:bg-[#13082F]"}`}
      >
        <div className="px-2 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={logo}
                className="h-12 w-40 sm:ms-5 sm:h-16 sm:w-52"
                alt="Logo"
              />
            </div>
            <div className="mr-12 hidden items-center justify-between space-x-12 md:flex">
              <div className="flex  gap-4 space-x-12 font-['Poppins'] text-lg lg:flex">
                <a
                  href="#features"
                  className="text-gray-600 transition hover:text-blue-600 dark:text-[#E0AAEE] dark:hover:text-[#C459D9]"
                  onClick={(e) => scrollToSection(digitalRef, e)}
                >
                  {t("onboarding.header.features")}
                </a>
                <a
                  href="#superpower"
                  className="text-gray-600 transition hover:text-blue-600 dark:text-[#E0AAEE] dark:hover:text-[#C459D9]"
                  onClick={(e) => scrollToSection(superpowerRef, e)}
                >
                  {t("onboarding.header.superpower")}
                </a>
                <a
                  href="#solutions"
                  className="text-gray-600 transition hover:text-blue-600 dark:text-[#E0AAEE] dark:hover:text-[#C459D9]"
                  onClick={(e) => scrollToSection(solutionsRef, e)}
                >
                  {t("onboarding.header.solutions")}
                </a>
              </div>
            </div>
            <div className="mx-10 hidden items-center justify-between gap-2 md:flex">
              <Toggles lang={lang} toggleLanguage={toggleLanguage} />
              <div dir="ltr" className=" p-2">
                <ThemeSwitcher />
              </div>
              <button
                className={`rounded bg-[#E1834E] py-2 text-lg text-white transition hover:bg-[#EA580C] md:ml-4 ${i18n.language === "ar" ? "px-8" : "px-12"}`}
                onClick={() => navigate("/role")}
              >
                {t("onboarding.header.login")}
              </button>
            </div>
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 focus:outline-none dark:text-[#E0AAEE]"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
       {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`fixed lg:hidden ${i18n.language === "ar" ? "left-5" : "right-5"} top-22 z-40 w-56 rounded-xl bg-gradient-to-b from-[#D1B5FF] to-[#AB92ED] p-4 shadow-lg dark:from-[#4B3D6B] dark:to-[#2D1E4A]`}
          >
            <button
              onClick={() => setIsOpen(false)}
              className={`absolute top-2 ${i18n.language === "ar" ? "left-2" : "right-2"} text-white hover:text-gray-300 dark:text-[#E0AAEE]`}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="space-y-4 pt-6 text-center">
              <a
                href="#features"
                className="block text-white hover:text-blue-600 dark:text-[#E0AAEE] dark:hover:text-[#C459D9]"
                onClick={(e) => scrollToSection(digitalRef, e)}
              >
                {t("onboarding.header.features")}
              </a>
              <hr className="border-white dark:border-[#E0AAEE]" />
              <a
                href="#superpower"
                className="block text-white hover:text-blue-600 dark:text-[#E0AAEE] dark:hover:text-[#C459D9]"
                onClick={(e) => scrollToSection(superpowerRef, e)}
              >
                {t("onboarding.header.superpower")}
              </a>
              <hr className="border-white dark:border-[#E0AAEE]" />
              <a
                href="#solutions"
                className="block text-white hover:text-blue-600 dark:text-[#E0AAEE] dark:hover:text-[#C459D9]"
                onClick={(e) => scrollToSection(solutionsRef, e)}
              >
                {t("onboarding.header.solutions")}
              </a>
              <hr className="border-white dark:border-[#E0AAEE]" />
              <div className="flex items-center justify-center">
                <Toggles lang={lang} toggleLanguage={toggleLanguage} />
              </div>
              <hr className="border-white dark:border-[#E0AAEE]" />
              <button
                className={`w-full rounded-full bg-[#E1834E] px-4 py-2 text-center text-white hover:bg-[#EA580C] dark:text-[#E0AAEE] ${i18n.language === "ar" ? "px-2" : "px-12"}`}
                onClick={() => navigate("/role")}
              >
                {t("onboarding.header.login")}
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#EEE8F6] pb-10 pt-24 text-center dark:bg-[#13082F]">
        <section
          ref={sectionRef}
          className="text-black-1 relative z-20 mx-auto mb-12 mt-12 flex w-[90%] max-w-[90%] flex-col items-center rounded-[30px] border-2 border-[rgba(255,255,255,0.55)] bg-[rgba(0,0,0,0.02)] px-4 py-8 backdrop-blur-[20px] dark:border-[#E0AAEE] dark:bg-[#281459]/90 dark:backdrop-blur-[10px]"
        >
          <div className="relative z-20 px-4">
            <motion.h1
              className="line-height-[1.3] mx-auto mb-4 mt-8 w-[90%] font-['Poppins'] text-4xl font-bold text-gray-900 dark:text-[#E0AAEE] md:text-5xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              {t("onboarding.hero.title")}
            </motion.h1>
            <div className="mb-8 mt-10 flex flex-wrap justify-center gap-4">
              <motion.div className="flex flex-col gap-6 md:flex-row md:space-x-4">
                <motion.img
                  src={student1}
                  alt="Student 1"
                  className="z-20 h-[200px] w-[180px] object-cover"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                />
                <motion.img
                  src={student2}
                  alt="Student 2"
                  className="z-20 h-[200px] w-[180px] object-cover"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                />
              </motion.div>
              <motion.div className="flex flex-col gap-6 md:flex-row md:space-x-4">
                <motion.img
                  src={student3}
                  alt="Student 3"
                  className="z-20 h-[200px] w-[130px] object-cover"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                />
                <motion.img
                  src={student4}
                  alt="Student 4"
                  className="z-20 h-[200px] w-[180px] object-cover"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                />
              </motion.div>
            </div>
            <motion.p
              className="mx-auto mb-8 mt-8 max-w-2xl text-lg text-gray-700 dark:text-[#D1D5DB] md:text-xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {t("onboarding.hero.description")}
            </motion.p>
          </div>
        </section>
        <motion.div
          className="absolute z-10 h-24 w-24 rounded-full bg-green-400"
          initial={{ x: "-10%", y: "-10%", opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={circleStyles.green}
        />
        <motion.div
          className="absolute z-10 h-24 w-24 rounded-full bg-blue-500"
          initial={{ x: "-10%", y: "40%", opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={circleStyles.blue}
        />
        <motion.div
          className="absolute z-10 h-16 w-16 rounded-full bg-red-500"
          initial={{ x: "80%", y: "70%", opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={circleStyles.red}
        />
      </div>

      <div className="py-12 dark:bg-[#13082F]">
        <section
          ref={setDigitalRefs}
          className="mt-18 mx-auto w-[80%] max-w-7xl px-4 py-12 text-center"
        >
          <motion.h2
            className="line-height-[1.9] mx-auto mb-6 w-[60%] font-['Poppins'] text-3xl font-bold text-gray-900 dark:text-[#E0AAEE]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {t("onboarding.digital.title")}
          </motion.h2>
          <motion.div
            className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.div
              className="rounded-lg bg-gradient-to-br from-[#E6E0F5] to-[#F6F6F6] p-10 shadow-lg transition-shadow hover:shadow-xl dark:border dark:border-[#E0AAEE] dark:from-[#281459] dark:to-[#2D1E4A]"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text text-xl font-semibold text-transparent dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]">
                {t("onboarding.digital.cards.digital_experiences")}
              </h3>
              <p className="mt-2 text-lg text-gray-600 dark:text-[#D1D5DB]">
                {t("onboarding.digital.cards.digital_experiences_desc")}
              </p>
            </motion.div>
            <motion.div
              className="rounded-lg bg-gradient-to-br from-[#E6E0F5] to-[#F6F6F6] p-10 shadow-lg transition-shadow hover:shadow-xl dark:border dark:border-[#E0AAEE] dark:from-[#281459] dark:to-[#2D1E4A]"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text text-xl font-semibold text-transparent dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]">
                {t("onboarding.digital.cards.learning_materials")}
              </h3>
              <p className="mt-2 text-lg text-gray-600 dark:text-[#D1D5DB]">
                {t("onboarding.digital.cards.learning_materials_desc")}
              </p>
            </motion.div>
            <motion.div
              className="rounded-lg bg-gradient-to-br from-[#E6E0F5] to-[#F6F6F6] p-10 shadow-lg transition-shadow hover:shadow-xl dark:border dark:border-[#E0AAEE] dark:from-[#281459] dark:to-[#2D1E4A]"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text text-xl font-semibold text-transparent dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]">
                {t("onboarding.digital.cards.year_round_learning")}
              </h3>
              <p className="mt-2 text-lg text-gray-600 dark:text-[#D1D5DB]">
                {t("onboarding.digital.cards.year_round_learning_desc")}
              </p>
            </motion.div>
            <motion.div
              className="rounded-lg bg-gradient-to-br from-[#E6E0F5] to-[#F6F6F6] p-10 shadow-lg transition-shadow hover:shadow-xl dark:border dark:border-[#E0AAEE] dark:from-[#281459] dark:to-[#2D1E4A]"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text text-xl font-semibold text-transparent dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]">
                {t("onboarding.digital.cards.ai_driven_learning")}
              </h3>
              <p className="mt-2 text-lg text-gray-600 dark:text-[#D1D5DB]">
                {t("onboarding.digital.cards.ai_driven_learning_desc")}
              </p>
            </motion.div>
            <motion.div
              className="rounded-lg bg-gradient-to-br from-[#E6E0F5] to-[#F6F6F6] p-10 shadow-lg transition-shadow hover:shadow-xl dark:border dark:border-[#E0AAEE] dark:from-[#281459] dark:to-[#2D1E4A]"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text text-xl font-semibold text-transparent dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]">
                {t("onboarding.digital.cards.assessments")}
              </h3>
              <p className="mt-2 text-lg text-gray-600 dark:text-[#D1D5DB]">
                {t("onboarding.digital.cards.assessments_desc")}
              </p>
            </motion.div>
            <motion.div
              className="rounded-lg bg-gradient-to-br from-[#E6E0F5] to-[#F6F6F6] p-10 shadow-lg transition-shadow hover:shadow-xl dark:border dark:border-[#E0AAEE] dark:from-[#281459] dark:to-[#2D1E4A]"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] bg-clip-text text-xl font-semibold text-transparent dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]">
                {t("onboarding.digital.cards.lesson_plans")}
              </h3>
              <p className="mt-2 text-lg text-gray-600 dark:text-[#D1D5DB]">
                {t("onboarding.digital.cards.lesson_plans_desc")}
              </p>
            </motion.div>
          </motion.div>
        </section>

        <section
          ref={setSuperpowerRefs}
          className="relative mx-auto mb-16 mt-[150px] w-[92%] rounded-[20px] bg-[#F7F8EE] px-4 py-12 dark:bg-[#281459]"
        >
          <div
            className="_3-dots-wrapper big_screen absolute top-4 flex gap-2"
            style={{
              left: i18n.language === "ar" ? "auto" : "4",
              right: i18n.language === "ar" ? "4" : "auto",
            }}
          >
            <div className="dot red h-3 w-3 rounded-full bg-red-500"></div>
            <div className="dot yellow h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="dot green h-3 w-3 rounded-full bg-green-500"></div>
          </div>
          <motion.h2
            className="mx-8 my-4 mb-4 font-['Poppins'] text-xl font-bold text-gray-900 dark:text-[#E0AAEE] lg:text-3xl"
            initial={{ opacity: 0, y: 50 }}
            animate={
              superpowerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
            }
            transition={{ duration: 0.8 }}
          >
            {t("onboarding.superpower.subtitle")}
          </motion.h2>
          <motion.h2
            className="mx-8 my-4 mb-12 font-['Poppins'] text-2xl font-bold text-gray-900 dark:text-[#E0AAEE] lg:text-5xl"
            initial={{ opacity: 0, y: 50 }}
            animate={
              superpowerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
            }
            transition={{ duration: 0.8 }}
          >
            {t("onboarding.superpower.title")}
          </motion.h2>
          <div
            className="absolute top-[10%]"
            style={{
              right: i18n.language === "ar" ? "auto" : "5%",
              left: i18n.language === "ar" ? "5%" : "auto",
              transform: "translateY(-50%)",
              zIndex: 10,
            }}
          >
            <motion.img
              src={onboardingsection3}
              alt="Onboarding Section 3"
              className="h-auto w-[200px] object-cover md:w-[300px] lg:w-[400px]"
              initial={{ opacity: 0, x: 50 }}
              animate={
                superpowerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
              }
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
          <motion.div
            className="relative z-0 mx-8 mt-16 flex flex-col gap-12 md:flex-row"
            variants={containerVariants}
            initial="hidden"
            animate={superpowerInView ? "visible" : "hidden"}
          >
            <div className="flex flex-1 flex-col gap-8">
              <motion.div
                className="flex items-center rounded-lg border border-gray-100 bg-white p-6 shadow-md dark:border-[#E0AAEE] dark:bg-[#281459]"
                variants={cardVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}
              >
                <img
                  src={infrastructureIcon}
                  alt="Infrastructure Icon"
                  className={
                    i18n.language === "ar"
                      ? "ml-4 mr-2 h-12 w-12"
                      : "mr-4 h-12 w-12"
                  }
                />
                <div
                  className="text-left"
                  style={{ paddingLeft: i18n.language === "ar" ? "8px" : "0" }}
                >
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-[#E0AAEE]">
                    {t("onboarding.superpower.cards.infrastructure")}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-[#D1D5DB]">
                    {t("onboarding.superpower.cards.infrastructure_desc")}
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="flex items-center rounded-lg border border-gray-100 bg-white p-6 shadow-md dark:border-[#E0AAEE] dark:bg-[#281459]"
                variants={cardVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}
              >
                <img
                  src={calendarIcon}
                  alt="Calendar Setup Icon"
                  className={
                    i18n.language === "ar"
                      ? "ml-4 mr-2 h-12 w-12"
                      : "mr-4 h-12 w-12"
                  }
                />
                <div
                  className="text-left"
                  style={{ paddingLeft: i18n.language === "ar" ? "8px" : "0" }}
                >
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-[#E0AAEE]">
                    {t("onboarding.superpower.cards.calendar_setup")}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-[#D1D5DB]">
                    {t("onboarding.superpower.cards.calendar_setup_desc")}
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="flex items-center rounded-lg border border-gray-100 bg-white p-6 shadow-md dark:border-[#E0AAEE] dark:bg-[#281459]"
                variants={cardVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}
              >
                <img
                  src={timetableIcon}
                  alt="Timetable Design Icon"
                  className={
                    i18n.language === "ar"
                      ? "ml-4 mr-2 h-12 w-12"
                      : "mr-4 h-12 w-12"
                  }
                />
                <div
                  className="text-left"
                  style={{ paddingLeft: i18n.language === "ar" ? "8px" : "0" }}
                >
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-[#E0AAEE]">
                    {t("onboarding.superpower.cards.timetable_design")}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-[#D1D5DB]">
                    {t("onboarding.superpower.cards.timetable_design_desc")}
                  </p>
                </div>
              </motion.div>
            </div>
            <div className="flex flex-1 flex-col gap-8">
              <motion.div
                className="flex items-center rounded-lg border border-gray-100 bg-white p-6 shadow-md dark:border-[#E0AAEE] dark:bg-[#281459]"
                variants={cardVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}
              >
                <img
                  src={analyticsIcon}
                  alt="Analytics Icon"
                  className={
                    i18n.language === "ar"
                      ? "ml-4 mr-2 h-12 w-12"
                      : "mr-4 h-12 w-12"
                  }
                />
                <div
                  className="text-left"
                  style={{ paddingLeft: i18n.language === "ar" ? "8px" : "0" }}
                >
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-[#E0AAEE]">
                    {t("onboarding.superpower.cards.analytics")}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-[#D1D5DB]">
                    {t("onboarding.superpower.cards.analytics_desc")}
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="flex items-center rounded-lg border border-gray-100 bg-white p-6 shadow-md dark:border-[#E0AAEE] dark:bg-[#281459]"
                variants={cardVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}
              >
                <img
                  src={curriculumIcon}
                  alt="Curriculum Progress Icon"
                  className={
                    i18n.language === "ar"
                      ? "ml-4 mr-2 h-12 w-12"
                      : "mr-4 h-12 w-12"
                  }
                />
                <div
                  className="text-left"
                  style={{ paddingLeft: i18n.language === "ar" ? "8px" : "0" }}
                >
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-[#E0AAEE]">
                    {t("onboarding.superpower.cards.curriculum_progress")}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-[#D1D5DB]">
                    {t("onboarding.superpower.cards.curriculum_progress_desc")}
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="flex items-center rounded-lg border border-gray-100 bg-white p-6 shadow-md dark:border-[#E0AAEE] dark:bg-[#281459]"
                variants={cardVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                style={{ direction: i18n.language === "ar" ? "rtl" : "ltr" }}
              >
                <img
                  src={userManagementIcon}
                  alt="User Management Icon"
                  className={
                    i18n.language === "ar"
                      ? "ml-4 mr-2 h-12 w-12"
                      : "mr-4 h-12 w-12"
                  }
                />
                <div
                  className="text-left"
                  style={{ paddingLeft: i18n.language === "ar" ? "8px" : "0" }}
                >
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-[#E0AAEE]">
                    {t("onboarding.superpower.cards.user_management")}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-[#D1D5DB]">
                    {t("onboarding.superpower.cards.user_management_desc")}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <section
          ref={setSolutionsRefs}
          className="mx-auto mb-8 mt-16 max-w-7xl px-12 py-12 text-center"
        >
          <motion.h2
            className="mb-6 font-['Poppins'] text-3xl font-bold text-gray-900 dark:text-[#E0AAEE] md:text-4xl"
            initial={{ opacity: 0, y: 50 }}
            animate={
              solutionsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
            }
            transition={{ duration: 0.8 }}
          >
            {t("onboarding.solutions.title")}
          </motion.h2>
          <motion.p
            className="mx-auto mb-8 max-w-3xl text-lg text-gray-600 dark:text-[#D1D5DB]"
            initial={{ opacity: 0, y: 50 }}
            animate={
              solutionsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
            }
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t("onboarding.solutions.description")}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={
              solutionsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
            }
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button
              className="rounded-full bg-gradient-to-r from-[#CE4EA0] via-[#BF4ACB] to-[#AE45FB] px-8 py-3 font-poppins text-lg text-white transition-all hover:from-[#AE45FB] hover:via-[#BF4ACB] hover:to-[#CE4EA0]"
              onClick={() => navigate("/role")}
            >
              {t("onboarding.solutions.get_started")}
            </button>
          </motion.div>
        </section>
      </div>

      <footer
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
        className="mb-4 dark:bg-[#13082F]"
      >
        <div className="mx-5 grid gap-10 rounded-lg bg-[#EEE8F6] py-5 dark:bg-[#281459] sm:my-0 sm:grid-cols-2 xl:grid-cols-3">
          <div className="mx-auto mt-14">
            <img src={img5} alt="logoImage not found" />
            <h2 className="ms-6 font-poppins text-[#3D52A1] dark:text-[#E0AAEE] lg:ms-24">
              {t("onboarding.footer.slogan")}
            </h2>
          </div>
          <div className="ms-5 grid grid-cols-2 gap-x-4 gap-y-2 text-[#826FB5] dark:text-[#D1D5DB]">
            {t("onboarding.footer.points", { returnObjects: true }).map(
              (point, index) => (
                <div key={index} className="flex items-center">
                  <p className="size-6 rounded-full bg-gradient-to-r from-Color1OnBoarding via-Color2OnBoarding to-Color4OnBoarding p-[6px] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB]">
                    <p className="h-full w-full rounded-full bg-white dark:bg-[#281459]"></p>
                  </p>
                  <h2 className="ms-4 font-poppins text-[10px] md:text-sm">
                    {point}
                  </h2>
                </div>
              ),
            )}
          </div>
          <div className="flex items-center justify-between">
            <img
              src={img4}
              className="mx-auto h-64 md:w-96"
              alt="imagefooter not found"
            />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Onboarding;
