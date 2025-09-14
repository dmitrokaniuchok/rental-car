import { useState } from "react";
import Select, { components } from "react-select";
import { BsChevronDown } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../redux/slice.js";
import { getAllCars } from "../../redux/operations.js";
import css from "./SearchBar.module.css";

export default function SearchBox({ priceOptions = [] }) {
  const dispatch = useDispatch();
  const { cars, filters } = useSelector((state) => state.cars);

  // Унікальні бренди
  const allBrands = [...new Set(cars.map((c) => c.brand))].sort();

  // Локальні стани для тимчасового вибору
  const [localBrand, setLocalBrand] = useState(
    filters.brand ? { value: filters.brand, label: filters.brand } : null
  );
  const [localPrice, setLocalPrice] = useState(
    filters.price ? { value: filters.price, label: `$${filters.price}` } : null
  );
  const [minMileage, setMinMileage] = useState(filters.minMileage || "");
  const [maxMileage, setMaxMileage] = useState(filters.maxMileage || "");

  // Обробники змін
  const handleBrandChange = (value) => setLocalBrand(value);
  const handlePriceChange = (value) => setLocalPrice(value);
  const handleMinMileageChange = (e) =>
    setMinMileage(e.target.value.replace(/\D/g, ""));
  const handleMaxMileageChange = (e) =>
    setMaxMileage(e.target.value.replace(/\D/g, ""));

  // Формат числа
  const formatNumber = (num) =>
    num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") || "";

  // Індикатор випадаючого списку
  const DropdownIndicator = (props) => {
    const open = props.selectProps.menuIsOpen;
    return (
      <components.DropdownIndicator {...props}>
        <BsChevronDown
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
            fontSize: 16,
            color: "#101828",
          }}
        />
      </components.DropdownIndicator>
    );
  };

  const selectStyles = {
    control: (base) => ({
      ...base,
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      width: 204,
      height: 44,
      borderRadius: 12,
      backgroundColor: "#f7f7fb",
      border: "none",
      boxShadow: "none",
      fontFamily: "Manrope, sans-serif",
      fontWeight: 500,
      fontSize: 14,
      color: "#101828",
      cursor: "pointer",
      paddingLeft: 12,
      paddingRight: 12,
      "&:hover": { backgroundColor: "#f0f0f5" },
    }),
    valueContainer: (base) => ({ ...base, padding: 0 }),
    indicatorSeparator: () => ({ display: "none" }),
    dropdownIndicator: (base) => ({ ...base, padding: 0 }),
    placeholder: (base) => ({ ...base, color: "#101828", fontSize: 14 }),
    singleValue: (base) => ({ ...base, color: "#101828", fontSize: 14 }),
    menu: (base) => ({
      ...base,
      borderRadius: 12,
      backgroundColor: "#fff",
      boxShadow: "0 4px 36px rgba(0,0,0,0.02)",
      marginTop: 4,
      width: 204,
      zIndex: 10,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected ? "#f7f7fb" : "transparent",
      color: state.isSelected ? "#101828" : "#8d929a",
      cursor: "pointer",
      padding: "8px 12px",
      "&:active": { backgroundColor: "#f7f7fb" },
    }),
    menuList: (base) => ({
      ...base,
      padding: 0,
      "::-webkit-scrollbar": { width: "8px" },
      "::-webkit-scrollbar-thumb": {
        background: "#dadde1",
        borderRadius: "10px",
      },
    }),
  };

  const handleSearch = (e) => {
    e.preventDefault();

    // Створюємо об'єкт фільтрів
    const activeFilters = {
      brand: localBrand ? localBrand.value : null,
      price: localPrice ? Number(localPrice.value) : null,
      minMileage: minMileage ? Number(minMileage) : null,
      maxMileage: maxMileage ? Number(maxMileage) : null,
    };

    // Оновлюємо Redux
    dispatch(setFilters(activeFilters));

    // Викликаємо API з фільтрами
    dispatch(getAllCars({ page: 1, limit: 12, ...activeFilters })).then(() => {
      // Скидаємо локальні стани селектів
      setLocalBrand(null);
      setLocalPrice(null);
    });
  };

  return (
    <form className={css.container} onSubmit={handleSearch}>
      <div className={css.formRow}>
        <div className={css.field}>
          <label className={css.label}>Car brand</label>
          <Select
            classNamePrefix="custom-select"
            components={{ DropdownIndicator }}
            value={
              localBrand ||
              (filters.brand
                ? { value: filters.brand, label: filters.brand }
                : null)
            }
            onChange={handleBrandChange}
            options={allBrands.map((b) => ({ value: b, label: b }))}
            placeholder="Choose a brand"
            isSearchable={false}
            styles={selectStyles}
          />
        </div>

        <div className={css.field}>
          <label className={css.label}>Price / 1 hour</label>
          <Select
            classNamePrefix="custom-select"
            components={{ DropdownIndicator }}
            value={
              localPrice ||
              (filters.price
                ? { value: filters.price, label: `${filters.price}` }
                : null)
            }
            onChange={handlePriceChange}
            options={priceOptions.map((p) => ({
              value: Number(p),
              label: `${p}`,
            }))}
            placeholder="Choose a price"
            isSearchable={false}
            styles={selectStyles}
          />
        </div>

        <div className={css.field}>
          <label className={css.label}>Car mileage / km</label>
          <div className={css.mileageInputs}>
            <input
              className={css.mileageInput}
              type="text"
              placeholder="From"
              value={minMileage ? formatNumber(minMileage) : ""}
              onChange={handleMinMileageChange}
            />
            <input
              className={css.mileageInput}
              type="text"
              placeholder="To"
              value={maxMileage ? formatNumber(maxMileage) : ""}
              onChange={handleMaxMileageChange}
            />
          </div>
        </div>

        <button type="submit" className={css.searchButton}>
          Search
        </button>
      </div>
    </form>
  );
}
