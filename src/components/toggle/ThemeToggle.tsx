import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import './ThemeToggle.css';

const ToggleTheme: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
  };

  return (
    <button onClick={toggleTheme}>
      {isDarkMode ? (
        <Sun className="theme" size={24} />
      ) : (
        <Moon className="theme" size={24} />
      )}
    </button>
  );
};

export default ToggleTheme;
