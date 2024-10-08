import React from "react";
import "./Header.css";

// Define props type for NavLink component
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  ariaLabel?: string; // Optional prop
}

// Render a single navigation link.
const NavLink: React.FC<NavLinkProps> = ({ href, children, ariaLabel }) => {
  return (
    <a href={href} className="nav-link" aria-label={ariaLabel}>
      {children} {/* Display the link text */}
    </a>
  );
};

// Define props type for ProfileLink component
interface ProfileLinkProps {
  href: string;
  username: string;
}

// Render the user profile link.
const ProfileLink: React.FC<ProfileLinkProps> = ({ href, username }) => {
  return (
    <a className="profile" href={href} aria-label={`Profile of ${username}`}>
      {username} {/* Display the username */}
    </a>
  );
};

// Define the Header component that contains the navigation bar.
const Header: React.FC = () => {
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
        <ProfileLink href="/profile.html" username="JD" />
      </nav>
    </header>
  );
};

export default Header;
