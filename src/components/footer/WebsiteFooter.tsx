import { appearance } from "constants/appearance";
import { SocialMedia } from "./SocialMedia";
import "./WebsiteFooter.css";

const WebsiteFooter = () => {
  const thisYear = new Date().getFullYear();

  return (
    <footer>
      <p>
        &copy; {thisYear === 2025 ? "2025" : "2025-" + thisYear}{" "}
        {appearance.footer.name}. All rights reserved.
      </p>
      <SocialMedia></SocialMedia>
    </footer>
  );
};

export default WebsiteFooter;
