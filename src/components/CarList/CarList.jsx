import { useSelector } from "react-redux";
import css from "./CarList.module.css";
import { selectCars } from "../../redux/selectors.js";
import CarCard from "../CarCard/CarCard.jsx";

export default function CardList() {
  const cars = useSelector(selectCars);

  return (
    <ul className={css.carsList}>
      {cars.map((car) => (
        <li key={car.id} className={css.carsItem}>
          <CarCard car={car} />
        </li>
      ))}
    </ul>
  );
}
