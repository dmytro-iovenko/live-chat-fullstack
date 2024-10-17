import React from "react";
import "./Main.css";

/**
 * Props for the Main component.
 * Represents a main content of the page that can contain child components.
 */
interface MainProps {
  children: React.ReactNode; // Child components to be rendered
}

/**
 * Main component that represents the main content area of the application.
 * Combines sections for the chat list and chat conversation.
 * @param {MainProps} props - The props for the Main component.
 * @param {React.ReactNode} props.children - Child components to be rendered.
 * @returns {JSX.Element} The Main component rendering the main content area.
 */
const Main: React.FC<MainProps> = ({ children }: MainProps): JSX.Element => {
  return <main>{children}</main>;
};

export default Main;
