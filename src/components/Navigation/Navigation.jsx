import { NavLink } from "react-router-dom";
import css from "../Navigation/Navigation.module.css";

export default function Navigation() {
  return (
    <nav className={css.container}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? `${css.link} ${css.isActive}` : css.link
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/catalog"
        className={({ isActive }) =>
          isActive ? `${css.link} ${css.isActive}` : css.link
        }
      >
        Catalog
      </NavLink>
    </nav>
  );
}
