import { useTheme } from "../context/ThemeContext";
import { useTranslation } from 'react-i18next';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation();

  const themes = [
    {
      id: "dark",
      label: `🌙 ${t("dark")}`,
    },
    {
      id: "light",
      label: `☀️ ${t("light")}`,
    },
    {
      id: "forest",
      label: `🍃 ${t("forest")}`,
    },
    {
      id: "barbie",
      label: `🌸 ${t("barbie")}`,
    },
  ];
  
  return (
    <div className="theme-toggle">
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="theme-select"
      >
        {themes.map((themeOption) => (
          <option key={themeOption.id} value={themeOption.id}>
            {themeOption.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeToggle;