import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  return (
    <div className="flex">
      <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
    </div>
  );
};
export default ThemeSwitcher;
