import { useTheme } from "../context/ThemeContext";

const themes = [
  {
    id: "dark",
    label: "🌙 Dark",
  },
  {
    id: "light",
    label: "☀️ Light",
  },
  {
    id: "forest",
    label: "🍃 Forest",
  },
  {
    id: "barbie",
    label: "🌸 Barbie",
  },
];

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

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