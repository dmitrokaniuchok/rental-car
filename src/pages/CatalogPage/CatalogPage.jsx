import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCars } from "../../redux/operations.js";
import {
  selectCars,
  selectFilters,
  selectTotalCars,
} from "../../redux/selectors.js";
import SearchBar from "../../components/SearchBar/SearchBar.jsx";
import CarCard from "../../components/CarCard/CarCard.jsx";
import css from "./CatalogPage.module.css";

export default function CatalogPage() {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const filters = useSelector(selectFilters);
  const totalCars = useSelector(selectTotalCars);

  const brands = Array.from(new Set(cars.map((c) => c.brand)));
  const priceOptions = Array.from(
    new Set(cars.map((c) => Number(c.rentalPrice)))
  ).sort((a, b) => a - b);
  console.log(cars.map((c) => c.id));

  useEffect(() => {
    dispatch(getAllCars({ page: 1, limit: 12 }));
  }, [dispatch]);

  return (
    <div className={css.catalogContainer}>
      <SearchBar brands={brands} priceOptions={priceOptions} />

      <div className={css.carsGrid}>
        {cars.map((car, index) => (
          <CarCard key={`${car.id}-${index}`} car={car} />
        ))}
      </div>

      {cars.length < totalCars && (
        <button
          className={css.loadMore}
          onClick={() =>
            dispatch(
              getAllCars({
                page: Math.ceil(cars.length / 12) + 1,
                limit: 12,
                ...filters,
              })
            )
          }
        >
          Load More
        </button>
      )}
    </div>
  );
}
