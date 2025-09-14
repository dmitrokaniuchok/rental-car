import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { toggleFavorite } from "../../redux/slice.js";
import css from "./CarCard.module.css";

export default function CarCard({ car }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const favorites = useSelector((state) => state.cars.favorites);
  const isFavorite = favorites.includes(car.id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(car.id));
  };

  const handleReadMore = () => {
    navigate(`/catalog/${car.id}`);
  };

  const [city, country] = (car.address?.split(",").map((s) => s.trim()) || [])
    .slice(1, 3)
    .map((v) => v || "N/A");

  const formattedMileage = (car.mileage || 0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  return (
    <div className={css.card}>
      <div className={css.imageWrapper}>
        <img src={car.img} alt={car.description || car.model} />
        <button className={css.favoriteBtn} onClick={handleToggleFavorite}>
          {isFavorite ? (
            <IoMdHeart color="#3470FF" />
          ) : (
            <IoMdHeartEmpty color="#fff" />
          )}
        </button>
      </div>

      <div className={css.content}>
        <div className={css.headerRow}>
          <h3 className={css.title}>
            {car.brand} <span>{car.model}</span>, {car.year}
          </h3>
          <p className={css.price}>${car.rentalPrice}</p>
        </div>

        <div className={css.details}>
          <span>{city}</span>
          <span>{country}</span>
          <span>{car.rentalCompany}</span>
          <span>{car.type}</span>
          <span>{formattedMileage} km</span>
        </div>
      </div>

      <div className={css.btn}>
        <button className={css.readMoreBtn} onClick={handleReadMore}>
          Read more
        </button>
      </div>
    </div>
  );
}
