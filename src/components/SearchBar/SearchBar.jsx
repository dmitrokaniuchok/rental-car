import { useState } from "react";
import Select, { components } from "react-select";
import { BsChevronDown } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../redux/slice.js";
import { getAllCars } from "../../redux/operations.js";
import { selectFilters } from "../../redux/selectors.js";
import css from "../../components/SearchBar/SearchBar.module.css";

export default function SearchBox({ brands, priceOptions }) {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  // Для внутрішніх значень select
  const [brandValue, setBrandValue] = useState(
    filters.brand ? { value: filters.brand, label: filters.brand } : null
  );
  const [priceValue, setPriceValue] = useState(
    filters.price ? { value: filters.price, label: filters.price } : null
  );

  // Форматування пробігу з пробілами
  const formatNumber = (num) => {
    if (!num) return "";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  // Зміни в select
  const handleBrandChange = (option) => {
    setBrandValue(option);
    dispatch(setFilters({ ...filters, brand: option ? option.value : null }));
  };

  const handlePriceChange = (option) => {
    setPriceValue(option);
    dispatch(
      setFilters({ ...filters, price: option ? Number(option.value) : null })
    );
  };

  const handleMinMileageChange = (e) => {
    const rawValue = e.target.value.replace(/ /g, "");
    dispatch(
      setFilters({
        ...filters,
        minMileage: rawValue ? Number(rawValue) : null,
      })
    );
  };

  const handleMaxMileageChange = (e) => {
    const rawValue = e.target.value.replace(/ /g, "");
    dispatch(
      setFilters({
        ...filters,
        maxMileage: rawValue ? Number(rawValue) : null,
      })
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getAllCars({ page: 1, limit: 12, ...filters }));
  };

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

  return (
    <form className={css.container} onSubmit={handleSearch}>
      <div className={css.formRow}>
        <div className={css.field}>
          <label>Car Brand</label>
          <Select
            components={{ DropdownIndicator }}
            value={brandValue}
            onChange={handleBrandChange}
            options={brands.map((b) => ({ value: b, label: b }))}
            placeholder="Choose a brand"
            classNamePrefix="custom-select"
            isSearchable={false}
          />
        </div>

        <div className={css.field}>
          <label>Price / 1 hour</label>
          <Select
            components={{ DropdownIndicator }}
            value={priceValue}
            onChange={handlePriceChange}
            options={priceOptions.map((p) => ({
              value: p,
              label: `$${p}`,
            }))}
            placeholder="Choose a price"
            classNamePrefix="custom-select"
            isSearchable={false}
          />
        </div>

        <div className={css.field}>
          <label>Mileage / km</label>
          <div className={css.mileageInputs}>
            <input
              type="text"
              placeholder="Min"
              value={formatNumber(filters.minMileage)}
              onChange={handleMinMileageChange}
            />
            <input
              type="text"
              placeholder="Max"
              value={formatNumber(filters.maxMileage)}
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
