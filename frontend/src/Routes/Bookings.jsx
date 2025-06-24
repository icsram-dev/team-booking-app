import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext.jsx";
import { getUserBookings, cancelBooking } from "../services/bookingService.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CancelModal from "../components/CancelModal.jsx";

export default function Bookings() {
  const navigate = useNavigate();
  const [userBookings, setUserBookings] = useState([]);
  const { user } = useContext(AuthContext);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookings = await getUserBookings(user.id);
        setUserBookings(bookings);
      } catch (error) {
        toast.error("Hiba a betöltés során!");
      }
    };
    fetchBookings();
  }, [user.id]);

  const formatDate = (dateString) => {
    return dateString.substring(0, 10);
  };

  const hasDatePassed = (endDate) => {
    const currentDate = new Date();
    const bookingEndDate = new Date(endDate);
    return currentDate > bookingEndDate;
  };

  const handleCancelBooking = (bookingId) => {
    setSelectedBookingId(bookingId);
    setIsCancelModalOpen(true);
  };

  const handleConfirmCancelBooking = async () => {
    try {
      await cancelBooking(selectedBookingId);
      setUserBookings(userBookings.filter(booking => booking.id !== selectedBookingId));
      toast.success("Sikeresen lemondtad a foglalást!");
      setIsCancelModalOpen(false);
    } catch (error) {
      toast.error("Hiba a lemondás során! " + error.message);
    }
  };

  const handleEditBooking = (bookingId) => {
    navigate(`/booking/${bookingId}/edit`);
  };

  return (
    <div className="px-4 md:px-20">
      <h1 className="text-2xl font-bold mb-4 mt-4 text-center md:text-left">Foglalások és utak</h1>
      <div>
        {userBookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white border border-gray-300 rounded-lg shadow-sm p-4 mb-4 flex flex-col md:flex-row md:justify-between"
          >
            {booking.accommodation.photos[0] && (
              <img className="w-full md:w-56 h-40 object-cover mb-4 md:mb-0 md:me-4" src={booking.accommodation.photos[0]} alt="Accommodation" />
            )}
            <div className="flex flex-col justify-between w-full">
              <div className="flex flex-col md:flex-row md:justify-between mb-4">
                <h2 className="text-xl font-bold">{booking.accommodation.name}</h2>
                <div className="text-xl font-bold text-right mt-2 md:mt-0">
                HUF {Math.floor(booking.totalPrice)}
                </div>
              </div>
              <p className="text-gray-600 mb-1">{booking.description}</p>
              <p className="text-gray-600 mb-1">{formatDate(booking.startDate)} - {formatDate(booking.endDate)}</p>
              <p className="text-gray-600 mb-1">{booking.accommodation.location}</p>
              <p className="text-gray-600 mb-1">Személyek száma: {booking.numberOfGuests}</p>
              {hasDatePassed(booking.endDate) && (
                <p className="text-gray-600">Teljesült</p>
              )}
              <div className="flex flex-col md:flex-row md:space-x-4 mt-4">
                <button
                  onClick={() => handleCancelBooking(booking.id)}
                  className="text-red-500 hover:underline"
                >
                  Lemondás
                </button>
                <button
                  onClick={() => handleEditBooking(booking.id)}
                  className="text-blue-500 hover:underline mt-2 md:mt-0"
                >
                  Szerkesztés
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <CancelModal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        onConfirm={handleConfirmCancelBooking}
      />
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};