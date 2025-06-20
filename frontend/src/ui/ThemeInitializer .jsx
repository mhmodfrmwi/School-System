import { useEffect } from "react";

const ThemeInitializer = () => {
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    document.body.className = storedTheme;
    const handleStorageChange = () => {
      const newTheme = localStorage.getItem("theme");
      document.body.className = newTheme;
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return null;
};

export default ThemeInitializer;
