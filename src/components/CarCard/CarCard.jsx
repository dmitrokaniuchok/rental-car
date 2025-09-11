import css from "./CarCard.module.css";

export default function CarCard({ car }) {
  return (
    <div className={css.card}>
      <h3>
        {car.brand} {car.model}
      </h3>
      <p>Price: ${car.rentalPrice} / hour</p>
      <p>Mileage: {car.mileage} km</p>
    </div>
  );
}
