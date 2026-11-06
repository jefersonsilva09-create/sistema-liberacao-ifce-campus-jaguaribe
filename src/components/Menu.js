import { NavLink } from "react-router";
import Logo from "./Logo";

export default function Menu() {
  return (
    <nav className="menu-bar">
      <Logo />
      <div className="menu-buttons">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/liberacao">Liberação</NavLink>
      </div>
    </nav>
  );
}
