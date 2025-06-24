import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBooking, updateBooking } from "../../services/bookingService";
import AuthContext from "../../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditBookingByAdmin = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooking();
  }, []);

  const fetchBooking = async () => {
    try {
      const data = await getBooking(bookingId, user.token);
      setBooking(data);
    } catch (error) {
      toast.error("Hiba történt a foglalás betöltése során:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBooking((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        startDate: booking.startDate,
        endDate: booking.endDate,
        numberOfGuests: Number(booking.numberOfGuests, 10),
      };
      
      await updateBooking(bookingId, updatedData, user.token);
      toast.success("Foglalás sikeresen frissítve");
      navigate("/admin/bookings");
    } catch (error) {
      toast.error("Hiba történt a foglalás frissítése során");
      console.error("Update error:", error);
    }
  };

  if (!booking) return <div>Loading...</div>;

  return (
    <>
      <div className="flex justify-center items-center my-5">
        <h1 className="text-2xl pl-1 font-semibold">Foglalás szerkesztése</h1>
      </div>
      <div className="flex justify-center">
        <form
          className="w-7/12 bg-white p-5 rounded-lg shadow-lg"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="startDate"
            >
              Kezdődátum
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="startDate"
              type="date"
              name="startDate"
              value={booking.startDate.split('T')[0]}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="endDate"
            >
              Végdátum
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="endDate"
              type="date"
              name="endDate"
              value={booking.endDate.split('T')[0]}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="numberOfGuests"
            >
              Vendégek száma
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="numberOfGuests"
              type="number"
              name="numberOfGuests"
              value={booking.numberOfGuests}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => navigate("/admin/bookings")}
            >
              Mégse
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Mentés
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={2000}/>
    </>
  );
};

export default EditBookingByAdmin;
