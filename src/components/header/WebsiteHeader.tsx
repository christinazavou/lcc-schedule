import { Link } from "react-router-dom";
import ToggleTheme from "components/toggle/ThemeToggle";
import LoginToggleButton from "components/toggle/LoginToggleButton";
import "./WebsiteHeader.css";

export function WebsiteHeader() {
  return (
    <header>
      <nav>
        <Link to="/schedule">Schedule</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <div className="header-toggles">
        <LoginToggleButton></LoginToggleButton>
        <ToggleTheme></ToggleTheme>
      </div>
    </header>
  );
}
