import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBooking, updateBooking } from "../services/bookingService.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookingUpdateModal from "../components/BookingUpdateModal.jsx";

export default function EditBooking() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const bookingData = await getBooking(bookingId);
        setBooking(bookingData);
        setLoading(false);
      } catch (error) {
        toast.error("Hiba a foglalás betöltése során!");
      }
    };
    fetchBooking();
  }, [bookingId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking({
      ...booking,
      [name]: name === "numberOfGuests" ? Number(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const confirmUpdate = async () => {
    try {
      const updatedData = {
        startDate: booking.startDate,
        endDate: booking.endDate,
        numberOfGuests: booking.numberOfGuests,
      };

      await updateBooking(bookingId, updatedData);
      toast.success("Foglalás sikeresen frissítve!");
      navigate("/user/bookings");
    } catch (error) {
      toast.error("Hiba a foglalás frissítése során!");
    } finally {
      setIsModalOpen(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="px-20">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Foglalás szerkesztése</h1>

      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Kezdődátum</label>
          <input
            type="date"
            name="startDate"
            value={formatDate(booking.startDate)}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Végdátum</label>
          <input
            type="date"
            name="endDate"
            value={formatDate(booking.endDate)}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Személyek száma</label>
          <input
            type="number"
            name="numberOfGuests"
            value={booking.numberOfGuests}
            onChange={handleChange}
            className="border border-gray-300 rounded p-2 w-full"
            required
            min="1"
          />
        </div>
        <div className="flex justify-between pb-5">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Mentés
          </button>
          <button
            type="button"
            onClick={() => navigate("/user/bookings")}
            className="bg-gray-700 hover:bg-gray-800 text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-4 focus:ring-gray-300"
          >
            Vissza
          </button></div>

      </form>
      <ToastContainer position="top-right" autoClose={2000} />
      <BookingUpdateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmUpdate}
      />
    </div>
  );
};

const formatDate = (dateString) => {
  return dateString.substring(0, 10);
};