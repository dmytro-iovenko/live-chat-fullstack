import React from "react";
import Avatar from "../Avatar/Avatar";
import "./Header.css";
import { User } from "firebase/auth";

/**
 * Props for the NavLink component.
 * Represents a navigation link with an optional accessibility label.
 */
interface NavLinkProps {
  href: string; // The URL the link points to
  children: React.ReactNode; // Content to be displayed within the link
  ariaLabel?: string; // Optional label for accessibility
}

/**
 * NavLink component that renders a navigation link.
 * @param {NavLinkProps} props - The props for the NavLink component.
 * @param {string} props.href - The URL the link points to.
 * @param {React.ReactNode} props.children - Content to be displayed within the link.
 * @param {string} [props.ariaLabel] - Optional label for accessibility.
 * @returns {JSX.Element} The NavLink component displaying the link.
 */
const NavLink: React.FC<NavLinkProps> = ({ href, children, ariaLabel }: NavLinkProps): JSX.Element => {
  return (
    <a href={href} className="nav-link" aria-label={ariaLabel}>
      {children}
    </a>
  );
};

/**
 * Props for the ProfileLink component.
 * Represents a link to the user’s profile.
 */
interface ProfileLinkProps {
  href: string; // The URL of the profile page
  username: string | null; // The name of the user for display
}

/**
 * Renders the user profile link with an avatar.
 * @param {ProfileLinkProps} props - The props for the ProfileLink component.
 * @param {string} props.href - The URL of the profile page.
 * @param {string} props.username - The name of the user for display.
 * @returns {JSX.Element} The ProfileLink component with the user's avatar.
 */
const ProfileLink: React.FC<ProfileLinkProps> = ({ href, username }: ProfileLinkProps): JSX.Element => {
  return (
    <a className="profile" href={href} aria-label={`Profile of ${username ?? "Anonimous"}`}>
      {/* Render the avatar for the user */}
      <Avatar username={username} />
    </a>
  );
};

interface HeaderProps {
  user: User | null; // User data
  onLogout: () => void; // Logout function
}

/**
 * Header component that contains the navigation bar and profile link.
 * Renders navigation links and the user's profile link.
 * @returns {JSX.Element} The Header component rendering the navigation bar.
 */
const Header: React.FC<HeaderProps> = ({ user, onLogout }): JSX.Element => {
  // Create an array of navigation links for dynamic rendering.
  const links = [
    { href: "#", label: "Chats" },
    { href: "/visitors.html", label: "Visitors" },
    { href: "/team.html", label: "Team" },
  ];

  return (
    <header>
      <nav>
        {/* Map over the links array to render NavLink components */}
        {links.map((link) => (
          <NavLink key={link.href} href={link.href} ariaLabel={link.label}>
            {link.label}
          </NavLink>
        ))}
        {/* Add spacer to push profile link to the right */}
        <div style={{ flexGrow: 1 }} />
        {/* Render profile link */}
        {user ? (
          <>
            <ProfileLink href="/profile" username={user.displayName} />
          </>
        ) : null}
        <button onClick={onLogout} className="logout-button">
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;
