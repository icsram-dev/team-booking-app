import React, { useContext, useState,  } from "react";
import { FaMapMarkerAlt } from 'react-icons/fa';
import { createBooking } from "../services/bookingService";
import { addFavourite } from "../services/favouriteService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../contexts/AuthContext";
import ConfirmModal from "./ComfirmModal";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { hu } from "date-fns/locale/hu";

registerLocale("hu", hu);


export default function AccommodationOverview({ accommodation }) {
  const [showAllText, setShowAllText] = useState(false);
  const { user } = useContext(AuthContext);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);


  const isDescriptionLong = accommodation && accommodation.description.length > 750;

  const calculateTotalPrice = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const numberOfNights = (end - start) / (1000 * 60 * 60 * 24);

    if (numberOfNights <= 0) {
      toast.error("Kérjük válasszon ki érvényes dátumokat!");
      return 0;
    }

    return accommodation.price * numberOfNights * numberOfGuests;
  };

  const handleBooking = () => {
    if (!user) {
      toast.error("Kérjük jelentkezzen be a foglaláshoz!");
      return;
    }

    if (startDate && endDate && numberOfGuests > 0) {
      const calculatedTotalPrice = calculateTotalPrice();

      if (calculatedTotalPrice > 0) {
        setTotalPrice(calculatedTotalPrice);
        setIsModalOpen(true);
      }
    } else {
      toast.error("Kérjük válassza ki a dátumokat és a létszámot!");
    }
  };

  const handleConfirmBooking = async () => {
    try {
      const bookingData = { startDate, endDate, numberOfGuests: Number(numberOfGuests) };
      await createBooking(user, accommodation.id, bookingData);
      toast.success('Foglalás sikeres!');
      setIsModalOpen(false);
    } catch (e) {
      toast.error(`Foglalás sikertelen: ${e.message}`);
    }
  };

  const handleAddToFavourites = async () => {
    try {
      if (user && user.token) {
        await addFavourite(accommodation.id, user.token);
        toast.success("Szállás hozzáadva a kedvencekhez!");
      } else {
        toast.error("Bejelentkezés után hozzáadhatod a kedvenceidhez!");
      }
    } catch (error) {
      toast.error("Hiba történt a kedvencekhez adás közben!");
    }
  };

  function handleStartDate(date){
    if (date>endDate){
      setEndDate(date)
    }
    setStartDate(date)
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-2">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">{accommodation.name}</h1>
          <div className="flex items-center text-gray-600 mt-2 md:mt-0">
            <FaMapMarkerAlt className="text-blue-600" />
            <span className="ml-1">{accommodation.location}</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 mb-4">
        <div className="col-span-12 md:col-span-9">
          <div className="grid grid-cols-3 gap-2 mb-4">
            {accommodation?.photos?.slice(0, 5).map((photo, index) => (
              <div key={index} className={index === 0 ? "col-span-3 md:col-span-2 row-span-2" : "col-span-1 row-span-1"}>
                <img src={photo} alt={`Accommodation view ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
              </div>
            ))}
            {accommodation?.photos?.length > 5 && (
              <div className="col-span-1 row-span-1 relative">
                <img src={accommodation.photos[5]} alt="Accommodation view 6" className="w-full h-full object-cover rounded-lg" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-lg cursor-pointer"
                  onClick={() => setShowAllPhotos(true)}>
                  More
                </div>
              </div>
            )}
          </div>
          <div className={`text-sm text-gray-600 transition-all duration-500 ${showAllText ? 'max-h-full' : 'max-h-32 overflow-hidden'}`}>
            <p>{accommodation?.description}</p>
          </div>
          {isDescriptionLong && (
            <div className="mt-2">
              <button 
                className="text-blue-600 underline border border-blue-600 px-2 py-1 rounded" 
                onClick={() => setShowAllText(!showAllText)}
              >
                {showAllText ? 'Kevesebb' : 'Bővebben'}
              </button>
            </div>
          )}
          <div className="mt-4">
            <h2 className="text-lg font-semibold">Szolgáltatások</h2>
            <div className="flex flex-wrap items-center space-x-4 mt-2 text-gray-700">
              {accommodation?.services?.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-3">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-lg font-semibold">Ár: {accommodation?.price} Ft/éj</p>
            <div className="flex flex-col items-start space-y-2 mt-4 w-full">
              <p>Érkezés:</p>
              <DatePicker
                placeholderText="éééé.hh.nn"
                dateFormat={"yyyy.MM.dd"}
                calendarStartDay={1}
                locale={"hu"}
                selected={startDate}
                onChange={handleStartDate}
                className="border rounded px-2 py-1 mb-2 w-full"
              />
              <p>Távozás:</p>
              <DatePicker
                placeholderText="éééé.hh.nn"
                dateFormat={"yyyy.MM.dd"}
                calendarStartDay={1}
                locale={"hu"}
                startDate={startDate}
                endDate={endDate}
                selected={endDate}
                selectsEnd
                minDate={startDate}
                onChange={(date) => setEndDate(date)}
                className="border rounded px-2 py-1 mb-2 w-full"
              />
              <div className="w-full">
                <label className="block mb-1 font-semibold">Fő</label>
                <input
                  type="number"
                  value={numberOfGuests}
                  onChange={(e) => setNumberOfGuests(e.target.value)}
                  min="1"
                  className="border rounded px-2 py-1 mb-2 w-full"
                />
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded w-full" onClick={handleBooking}>
                Foglaljon most
              </button>
              <button
                onClick={handleAddToFavourites}
                className="bg-blue-600 text-white px-4 py-2 rounded w-full"
              >
                Kedvencekhez
              </button>
            </div>
          </div>
        </div>
      </div>
      {showAllPhotos && (
        <div className="fixed inset-0 bg-white z-50 p-4 overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold mx-auto">{accommodation?.name}</h2>
            <button
              className="flex items-center text-gray-500"
              onClick={() => setShowAllPhotos(false)}
            >
              Bezárás
              <span className="ml-2 bg-gray-500 text-white rounded-full h-8 w-8 flex items-center justify-center">x</span>
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {accommodation?.photos?.map((photo, index) => (
              <img key={index} src={photo} alt={`Accommodation view ${index + 1}`} className="w-full h-full object-cover rounded-lg" />
            ))}
          </div>
        </div>
      )}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmBooking}
        totalPrice={totalPrice}
      />
      <ToastContainer position="top-right" autoClose={2000}/>
    </div>
  );
}
