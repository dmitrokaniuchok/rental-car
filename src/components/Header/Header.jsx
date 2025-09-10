import Navigation from "../Navigation/Navigation.jsx";
import css from "../Header/Header.module.css";

export default function Header() {
  return (
    <header className={css.container}>
      <Navigation />
    </header>
  );
}
