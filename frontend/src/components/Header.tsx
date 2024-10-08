import "./Header.css";

const Header = () => {
  return (
    <header>
      <nav>
        <a href="#">Chats</a>
        <a href="/visitors.html">Visitors</a>
        <a href="/team.html">Team</a>
        <div style={{ flexGrow: 1 }}></div>
        <a className="profile" href="/profile.html">
          JD
        </a>
      </nav>
    </header>
  );
};

export default Header;
