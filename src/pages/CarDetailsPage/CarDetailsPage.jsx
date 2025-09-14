import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCarById } from "../../redux/operations.js";
import { clearCurrentItem } from "../../redux/slice.js";
import { selectCurrentCar, selectIsLoading } from "../../redux/selectors.js";
import { PiMapPin } from "react-icons/pi";
import {
  BsCheckCircle,
  BsCalendar2Week,
  BsCarFront,
  BsFuelPump,
  BsGear,
} from "react-icons/bs";
import Container from "../../components/Container/Container.jsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import css from "./CarDetailsPage.module.css";
import Loader from "../../components/Loader/Loader.jsx";

const CarDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const car = useSelector(selectCurrentCar);
  const isLoading = useSelector(selectIsLoading);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [comment, setComment] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    dispatch(getCarById(id));
    return () => {
      dispatch(clearCurrentItem());
    };
  }, [dispatch, id]);

  if (isLoading) return <Loader />;
  if (!car) return <p>Car not found</p>;

  const {
    img,
    brand,
    model,
    year,
    rentalPrice,
    address,
    type,
    mileage,
    description,
    fuelConsumption,
    engineSize,
    accessories,
    functionalities,
    rentalConditions,
  } = car;

  const formattedMileage =
    mileage?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") || "N/A";

  const shortId = car.img.match(/\/(\d+)-ai\.jpg$/)[1];

  const addressParts = address?.split(",").map((s) => s.trim()) || [];
  const city = addressParts[addressParts.length - 2] || "Unknown";
  const country = addressParts[addressParts.length - 1] || "";

  const formattedType =
    type?.charAt(0).toUpperCase() + type?.slice(1).toLowerCase();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (startDate) {
      setSuccess(true);
      setName("");
      setEmail("");
      setStartDate(null);
      setComment("");

      setTimeout(() => setSuccess(false), 4000);
    }
  };

  return (
    <Container>
      <div className={css.layout}>
        <div className={css.left}>
          <img
            src={img}
            alt={description || `${brand} ${model}`}
            className={css.image}
          />

          <div className={css.formBox}>
            <h3>Book your car now</h3>
            <p>Stay connected! We are always ready to help you.</p>

            <form className={css.form} onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Name*"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email*"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <DatePicker
                className={css.form}
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                placeholderText="Booking date*"
                dateFormat="dd.MM.yyyy"
                required
              />

              <textarea
                placeholder="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

              <button type="submit" className={css.btn}>
                Send
              </button>
            </form>

            {success && (
              <p className={css.success}>
                ✅ Your car has been successfully booked!
              </p>
            )}
          </div>
        </div>

        <div className={css.right}>
          <h2>
            {brand} {model}, {year}{" "}
            <span className={css.id}>id: {shortId}</span>
          </h2>
          <p className={css.location}>
            <PiMapPin size={16} /> {city}, {country}{" "}
            <span>Mileage: {formattedMileage} km</span>
          </p>
          <p className={css.price}>${rentalPrice}</p>
          <p className={css.desc}>{description}</p>

          <div className={css.section}>
            <h3>Rental Conditions:</h3>
            <ul>
              {rentalConditions?.map((item, idx) => (
                <li key={idx}>
                  <BsCheckCircle size={16} /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={css.section}>
            <h3>Car Specifications:</h3>
            <ul>
              <li>
                <BsCalendar2Week /> Year: {year}
              </li>
              <li>
                <BsCarFront /> Type: {formattedType}
              </li>
              <li>
                <BsFuelPump /> Fuel Consumption: {fuelConsumption}
              </li>
              <li>
                <BsGear /> Engine Size: {engineSize}
              </li>
            </ul>
          </div>

          <div className={css.section}>
            <h3>Accessories and functionalities:</h3>
            <ul>
              {[...(accessories || []), ...(functionalities || [])].map(
                (item, idx) => (
                  <li key={idx}>
                    <BsCheckCircle size={16} /> {item}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CarDetailsPage;
