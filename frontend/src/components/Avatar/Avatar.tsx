import React from "react";
import "./Avatar.css";

/**
 * Props for the Avatar component.
 * Contains the username used to generate the avatar initials.
 */
interface AvatarProps {
  username: string; // Username to generate initials
}

/**
 * Avatar component that displays a user's avatar based on their username.
 * Generates initials from the username and assigns a unique class for styling.
 * @param {AvatarProps} props - The properties object for the Avatar component.
 * @param {string} props.username - The username used to generate initials.
 * @returns {JSX.Element} The Avatar component rendering the initials.
 */

const Avatar: React.FC<AvatarProps> = ({ username }: AvatarProps): JSX.Element => {
  const initials = getInitials(username);
  const avatarClass = getAvatarClass(initials);

  return <div className={`chat-item-avatar ${avatarClass}`}>{initials}</div>;

  /**
   * Helper function to convert username into initials.
   * Takes the first two words of the username and returns their uppercase initials.
   * @param {string} username - The username string to convert.
   * @returns {string} The initials as a string.
   */
  function getInitials(username: string): string {
    const names = username.split(" ").slice(0, 2);
    return names.map((name) => name.charAt(0).toUpperCase()).join("");
  }

  /**
   * Helper function to determine the avatar class based on initials.
   * Generates a unique class name based on the character codes of the initials.
   * @param {string} initials - The initials string to analyze.
   * @returns {string} The CSS class name for the avatar.
   */
  function getAvatarClass(initials: string): string {
    const charSum = Array.from(initials).reduce((sum, char) => sum + char.charCodeAt(0), 0);
    console.log(initials, charSum)
    return `avatar-${charSum % 10}`;
  }
};

export default Avatar;
