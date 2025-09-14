import css from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={css.loaderOverlay}>
      <div className={css.spinner}></div>
    </div>
  );
}
