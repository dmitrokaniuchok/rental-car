import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCars } from "../../redux/operations.js";
import { clearSearchParams } from "../../redux/slice.js";
import {
  selectCars,
  selectFilters,
  selectTotalCars,
  selectIsLoading,
} from "../../redux/selectors.js";
import SearchBox from "../../components/SearchBar/SearchBar.jsx";
import CardList from "../../components/CarList/CarList.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import css from "./CatalogPage.module.css";

export default function CatalogPage() {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const filters = useSelector(selectFilters);
  const totalCars = useSelector(selectTotalCars);
  const isLoading = useSelector(selectIsLoading);

  const [loadingMore, setLoadingMore] = useState(false);

  const brands = Array.from(new Set(cars.map((c) => c.brand)));
  const priceOptions = Array.from(
    new Set(cars.map((c) => Number(c.rentalPrice)))
  ).sort((a, b) => a - b);

  // Початкове завантаження або при зміні фільтрів
  useEffect(() => {
    dispatch(clearSearchParams());
    dispatch(getAllCars({ page: 1, limit: 12, ...filters }));
  }, [dispatch, filters]);

  // Завантаження наступної сторінки
  const handleLoadMore = () => {
    const nextPage = Math.ceil(cars.length / 12) + 1;
    setLoadingMore(true);
    dispatch(getAllCars({ page: nextPage, limit: 12, ...filters })).finally(
      () => setLoadingMore(false)
    );
  };

  return (
    <div className={css.catalogContainer}>
      <SearchBox brands={brands} priceOptions={priceOptions} />

      <div className={css.cardsWrapper}>
        {isLoading && cars.length === 0 ? <Loader /> : <CardList />}
      </div>

      {cars.length > 0 && cars.length < totalCars && (
        <button
          type="button"
          className={css.loadMore}
          onClick={handleLoadMore}
          disabled={loadingMore}
        >
          {loadingMore ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}
