import { Link } from "react-router-dom";
import css from "./Hero.module.css";

export default function Hero() {
  return (
    <div className={css.container}>
      <div className={css.wrapper}>
        <h1 className={css.title}>Find your perfect rental car</h1>
        <p className={css.text}>
          Reliable and budget-friendly rentals for any journey
        </p>
      </div>
      <Link className={css.button} to="/catalog">
        View Catalog
      </Link>
    </div>
  );
}
