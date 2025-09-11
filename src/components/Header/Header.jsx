import Navigation from "../Navigation/Navigation.jsx";
import MainLogo from "../Logo/Logo.jsx";
import css from "../Header/Header.module.css";

export default function Header() {
  return (
    <header className={css.container}>
      <MainLogo />
      <Navigation />
    </header>
  );
}
