import { Link } from "react-router-dom";
import Logo from "../images/Logo.png";
import css from "./Logo.module.css";

export default function MainLogo() {
  return (
    <Link className={css.container} to="/">
      <img src={Logo} alt="Logo" width="106" height="16" />
    </Link>
  );
}
