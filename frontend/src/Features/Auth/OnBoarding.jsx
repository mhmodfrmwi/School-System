import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useInView } from 'react-intersection-observer';

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

function Toggles({ lang, toggleLanguage }) {
  return (
    <div className="flex items-center">
      <button
        onClick={toggleLanguage}
        className="flex items-center justify-center rounded-full bg-gradient-to-r from-[#CE4EA0] via-[#BF4ACB] to-[#AE45FB] px-4 py-2 text-white font-poppins text-sm"
      >
        {lang === "en" ? "العربية" : "English"}
      </button>
    </div>
  );
}

function ThemeToggle({ isDarkMode, toggleTheme }) {
  return (
    <button
      className="mx-auto ms-6 p-2 text-gray-500 dark:text-[#E0AAEE]"
      onClick={toggleTheme}
    >
      <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`} style={{ fontSize: '1.5em' }}></i>
    </button>
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
    green: { top: '5%', left: '5%' },
    blue: { bottom: '5%', left: '5%' },
    red: { bottom: '5%', right: '5%' },
  });
  const [lang, setLang] = useState(i18n.language);
  const [isDarkMode, setIsDarkMode] = useState(document.body.classList.contains("dark"));

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
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const toggleLanguage = () => {
    const newLang = lang === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    setLang(newLang);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 640) {
        setCircleStyles({
          green: { top: '12%', left: '19%' },
          blue: { bottom: '24%', left: '3%' },
          red: { bottom: '11%', right: '25%' },
        });
      } else if (width <= 768) {
        setCircleStyles({
          green: { top: '12%', left: '25%' },
          blue: { bottom: '24%', left: '3%' },
          red: { bottom: '11%', right: '21%' },
        });
      } else {
        setCircleStyles({
          green: { top: '15%', left: '25%' },
          blue: { bottom: '25%', left: '4%' },
          red: { bottom: '14%', right: '15%' },
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const isDark = document.body.classList.contains("dark");
          setIsDarkMode(isDark);
        }
      });
    });

    observer.observe(document.body, { attributes: true });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (ref, e) => {
    if (e) e.preventDefault();
    ref.current.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen font-['Poppins'] dark:bg-[#13082F]" dir={i18n.language === "ar" ? "rtl" : "ltr"}>
      {/* Navigation Bar */}
      <nav className={`fixed w-full z-50 border-b border-gray-300 transition-colors duration-200 ${isScrolled ? 'bg-white shadow' : 'bg-[#EEE8F6]'}`}>
        <div className="px-2 py-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                src={logo}
                className="h-12 w-40 sm:ms-5 sm:h-16 sm:w-52"
                alt="Logo"
              />
            </div>
            <div className="hidden md:flex justify-between items-center space-x-12 mr-12">
              <div className="hidden lg:flex flex space-x-12 gap-4 font-['Poppins'] text-lg">
                <a href="#features" className="text-gray-600 hover:text-blue-600 transition" onClick={(e) => scrollToSection(digitalRef, e)}>Features</a>
                <a href="#superpower" className="text-gray-600 hover:text-blue-600 transition" onClick={(e) => scrollToSection(superpowerRef, e)}>Superpower</a>
                <a href="#solutions" className="text-gray-600 hover:text-blue-600 transition" onClick={(e) => scrollToSection(solutionsRef, e)}>Solutions</a>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 justify-between mx-10">
                <Toggles lang={lang} toggleLanguage={toggleLanguage} />
                <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
                <button
                  className={`bg-[#E1834E] text-white text-lg py-2 rounded hover:bg-[#EA580C] transition md:ml-4 ${i18n.language === 'ar' ? 'px-8' : 'px-12'}`}
                  onClick={() => navigate("/role")}
                >
                  {t("onboarding.header.login")}
                </button>
              </div>
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            className={`lg:hidden fixed ${i18n.language === "ar" ? "left-5" : "right-5"} top-22 z-40 w-56 rounded-xl bg-gradient-to-b from-[#D1B5FF] to-[#AB92ED] dark:from-[#4B3D6B] dark:to-[#2D1E4A] shadow-lg p-4`}
          >
            <button
              onClick={() => setIsOpen(false)}
              className={`absolute top-2 ${i18n.language === 'ar' ? 'left-2' : 'right-2'} text-white hover:text-gray-300`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="pt-6 space-y-4 text-center">
              <a href="#features" className="block text-white dark:text-gray-200 hover:text-blue-600" onClick={(e) => scrollToSection(digitalRef, e)}>Features</a>
              <hr className="border-white dark:border-gray-500" />
              <a href="#superpower" className="block text-white dark:text-gray-200 hover:text-blue-600" onClick={(e) => scrollToSection(superpowerRef, e)}>Superpower</a>
              <hr className="border-white dark:border-gray-500" />
              <a href="#solutions" className="block text-white dark:text-gray-200 hover:text-blue-600" onClick={(e) => scrollToSection(solutionsRef, e)}>Solutions</a>
              <hr className="border-white dark:border-gray-500" />
              <div className="flex justify-center items-center">
                <Toggles lang={lang} toggleLanguage={toggleLanguage} />
              </div>
              <hr className="border-white dark:border-gray-500" />
              <div className="flex justify-center items-center mx-[30%]">
                <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
              </div>
              <hr className="border-white dark:border-gray-500" />
              <button
                className={`w-full text-center text-white dark:text-gray-200 bg-[#E1834E] px-4 py-2 rounded-full hover:bg-[#EA580C] ${i18n.language === 'ar' ? 'px-2' : 'px-12'}`}
                onClick={() => navigate("/role")}
              >
                {t("onboarding.header.login")}
              </button>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative bg-[#EEE8F6] pt-24 pb-10 min-h-screen flex items-center justify-center text-center overflow-hidden">
        <section ref={sectionRef} className="relative mt-12 mb-12 text-black-1 bg-[rgba(0,0,0,0.02)] border-2 border-[rgba(255,255,255,0.55)] rounded-[30px] px-4 py-8 w-[90%] max-w-[90%] flex flex-col items-center relative backdrop-blur-[20px] z-20 mx-auto">
          <div className="relative z-20 px-4">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 line-height-[1.3] text-[#313131] font-['Poppins'] w-[90%] mx-auto mt-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Transform your school to digital, today!
            </motion.h1>
            <div className="flex justify-center flex-wrap gap-4 mb-8 mt-10">
              <motion.div className="flex flex-col md:flex-row md:space-x-4 gap-6">
                <motion.img
                  src={student1}
                  alt="Student 1"
                  className="w-[180px] h-[200px] object-cover z-20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                />
                <motion.img
                  src={student2}
                  alt="Student 2"
                  className="w-[180px] h-[200px] object-cover z-20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                />
              </motion.div>
              <motion.div className="flex flex-col md:flex-row md:space-x-4 gap-6">
                <motion.img
                  src={student3}
                  alt="Student 3"
                  className="w-[130px] h-[200px] object-cover z-20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                />
                <motion.img
                  src={student4}
                  alt="Student 4"
                  className="w-[180px] h-[200px] object-cover z-20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                />
              </motion.div>
            </div>
            <motion.p
              className="text-lg md:text-xl text-gray-700 mb-8 mt-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Learnova is your one-stop digital solution partner to empower your educators, learners and management.
            </motion.p>
          </div>
        </section>
        <motion.div
          className="absolute w-24 h-24 bg-green-400 rounded-full z-10"
          initial={{ x: '-10%', y: '-10%', opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={circleStyles.green}
        />
        <motion.div
          className="absolute w-24 h-24 bg-blue-500 rounded-full z-10"
          initial={{ x: '-10%', y: '40%', opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={circleStyles.blue}
        />
        <motion.div
          className="absolute w-16 h-16 bg-red-500 rounded-full z-10"
          initial={{ x: '80%', y: '70%', opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          style={circleStyles.red}
        />
      </div>

      <div className="py-12">
        <section ref={setDigitalRefs} className="max-w-7xl py-12 mt-18 mx-auto px-4 text-center w-[80%]">
          <motion.h2
            className="text-3xl font-bold text-gray-900 mb-6 line-height-[1.9] font-['Poppins'] w-[60%] mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Here’s what your school gets by partnering with Learnova
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.div
              className="bg-gradient-to-br from-[#E6E0F5] to-[#F6F6F6] dark:from-[#4B3D6B] dark:to-[#281459] p-10 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] bg-clip-text text-transparent">Digital Experiences</h3>
              <p className="text-gray-600 text-lg dark:text-gray-300 mt-2">For both in-class and after-class learning</p>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-[#E6E0F5] to-[#F6F6F6] dark:from-[#4B3D6B] dark:to-[#281459] p-10 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] bg-clip-text text-transparent">Learning Materials</h3>
              <p className="text-gray-600 text-lg dark:text-gray-300 mt-2">In print and digital formats</p>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-[#E6E0F5] to-[#F6F6F6] dark:from-[#4B3D6B] dark:to-[#281459] p-10 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] bg-clip-text text-transparent">Year-round Learning</h3>
              <p className="text-gray-600 text-lg dark:text-gray-300 mt-2">Holistic learning</p>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-[#E6E0F5] to-[#F6F6F6] dark:from-[#4B3D6B] dark:to-[#281459] p-10 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] bg-clip-text text-transparent">AI-driven Learning</h3>
              <p className="text-gray-600 text-lg dark:text-gray-300 mt-2">To meet all learning goals</p>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-[#E6E0F5] to-[#F6F6F6] dark:from-[#4B3D6B] dark:to-[#281459] p-10 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] bg-clip-text text-transparent">Assessments</h3>
              <p className="text-gray-600 text-lg dark:text-gray-300 mt-2">For all subjects with question banks</p>
            </motion.div>
            <motion.div
              className="bg-gradient-to-br from-[#E6E0F5] to-[#F6F6F6] dark:from-[#4B3D6B] dark:to-[#281459] p-10 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-semibold bg-gradient-to-r from-[#FD813D] via-[#CF72C0] to-[#BC6FFB] dark:from-[#CE4EA0] dark:via-[#BF4ACB] dark:to-[#AE45FB] bg-clip-text text-transparent">Lesson Plans</h3>
              <p className="text-gray-600 text-lg dark:text-gray-300 mt-2">Comprehensive plans for teachers</p>
            </motion.div>
          </motion.div>
        </section>

        <section ref={setSuperpowerRefs} className="w-[92%] mx-auto px-4 py-12 mt-[150px] mb-16 bg-[#F7F8EE] relative rounded-[20px]">
          <div className="_3-dots-wrapper big_screen absolute top-4 left-4 flex space-x-2">
            <div className="dot red w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="dot yellow w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="dot green w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <motion.h2
            className="text-xl lg:text-3xl font-bold text-gray-900 mb-4 my-4 mx-8 font-['Poppins']"
            initial={{ opacity: 0, y: 50 }}
            animate={superpowerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            Your school’s
          </motion.h2>
          <motion.h2
            className="text-2xl lg:text-5xl font-bold text-gray-900 mb-12 my-4 mx-8 font-['Poppins']"
            initial={{ opacity: 0, y: 50 }}
            animate={superpowerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8 }}
          >
            One Superpower
          </motion.h2>
          <div className="absolute top-[10%] right-[5%] transform translate-y-[-50%] z-10">
            <motion.img
              src={onboardingsection3}
              alt="Onboarding Section 3"
              className="w-[200px] md:w-[300px] lg:w-[400px] h-auto object-cover"
              initial={{ opacity: 0, x: 50 }}
              animate={superpowerInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>
          <motion.div
            className="flex flex-col md:flex-row gap-12 mx-8 relative z-0 mt-16"
            variants={containerVariants}
            initial="hidden"
            animate={superpowerInView ? "visible" : "hidden"}
          >
            <div className="flex-1 flex flex-col gap-8">
              <motion.div
                className="bg-white p-6 rounded-lg shadow-md flex items-center border border-gray-100"
                variants={cardVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <img src={infrastructureIcon} alt="Infrastructure Icon" className="w-12 h-12 mr-4" />
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Infrastructure</h3>
                  <p className="text-sm text-gray-600">Textbooks and integrated platform for online and offline</p>
                </div>
              </motion.div>
              <motion.div
                className="bg-white p-6 rounded-lg shadow-md flex items-center border border-gray-100"
                variants={cardVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <img src={calendarIcon} alt="Calendar Setup Icon" className="w-12 h-12 mr-4" />
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Calendar Setup</h3>
                  <p className="text-sm text-gray-600">Easy calendar setup with personalisation</p>
                </div>
              </motion.div>
              <motion.div
                className="bg-white p-6 rounded-lg shadow-md flex items-center border border-gray-100"
                variants={cardVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <img src={timetableIcon} alt="Timetable Design Icon" className="w-12 h-12 mr-4" />
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Timetable Design</h3>
                  <p className="text-sm text-gray-600">Automated timetables for smooth day-to-day functioning</p>
                </div>
              </motion.div>
            </div>
            <div className="flex-1 flex flex-col gap-8">
              <motion.div
                className="bg-white p-6 rounded-lg shadow-md flex items-center border border-gray-100"
                variants={cardVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <img src={analyticsIcon} alt="Analytics Icon" className="w-12 h-12 mr-4" />
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics</h3>
                  <p className="text-sm text-gray-600">Academic progress tracked school wide</p>
                </div>
              </motion.div>
              <motion.div
                className="bg-white p-6 rounded-lg shadow-md flex items-center border border-gray-100"
                variants={cardVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <img src={curriculumIcon} alt="Curriculum Progress Icon" className="w-12 h-12 mr-4" />
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Curriculum Progress</h3>
                  <p className="text-sm text-gray-600">Concepts, content and skills tracked across all teaching stages</p>
                </div>
              </motion.div>
              <motion.div
                className="bg-white p-6 rounded-lg shadow-md flex items-center border border-gray-100"
                variants={cardVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <img src={userManagementIcon} alt="User Management Icon" className="w-12 h-12 mr-4" />
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">User Management</h3>
                  <p className="text-sm text-gray-600">HR needs and admin management</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <section ref={setSolutionsRefs} className="max-w-7xl mx-auto px-12 py-12 mb-8 mt-16 text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 font-['Poppins']"
            initial={{ opacity: 0, y: 50 }}
            animate={solutionsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50}}
            transition={{ duration: 0.8 }}
          >
            All the solutions your school needs in one place!
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={solutionsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            A successful digital transformation can only happen when the learning platform meets the specific needs of your school. With OneLern as your partner, your school will be future-ready with a digital learning platform that optimizes teaching and learning experiences.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={solutionsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button
              className="bg-gradient-to-r from-[#CE4EA0] via-[#BF4ACB] to-[#AE45FB] text-white px-8 py-3 rounded-full font-poppins text-lg hover:from-[#AE45FB] hover:via-[#BF4ACB] hover:to-[#CE4EA0] transition-all"
              onClick={() => navigate("/role")}
            >
              Get Started
            </button>
          </motion.div>
        </section>
      </div>

      <footer
        dir={i18n.language === "ar" ? "rtl" : "ltr"}
        className="dark:bg-[#13082F] mb-4"
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