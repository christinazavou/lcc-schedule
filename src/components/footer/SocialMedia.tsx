import { appearance } from "constants/appearance";

export const SocialMedia = () => {
  return (
    <div className="tw-flex tw-gap-4">
      <a
        className="tw-hover:tw-text-gray-800"
        href={appearance.footer.socialmedia.instagram}
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-instagram"></i>
      </a>
    </div>
  );
};
