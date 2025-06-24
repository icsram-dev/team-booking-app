import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteBooking,
  getAllBookings,
} from "../../services/adminBookingService";
import { getUser } from "../../services/userService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "../../components/DeleteAgreeModal";

export default function Bookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingIdToDelete, setBookingIdToDelete] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async (searchParams = {}) => {
    try {
      const data = await getAllBookings(searchParams);
      const bookingsWithUserDetails = await Promise.all(
        data.map(async (booking) => {
          const userDetails = await getUser(booking.userId);
          return {
            ...booking,
            userName: userDetails.name,
            userEmail: userDetails.email,
          };
        })
      );
      setBookings(bookingsWithUserDetails);
    } catch (err) {
      toast.error("Hiba történt a foglalások betöltése során");
    }
  };

  const handleDeleteBooking = async () => {
    try {
      await deleteBooking(bookingIdToDelete);
      setBookings(bookings.filter((booking) => booking.id !== bookingIdToDelete));
      toast.success("Foglalás törölve");
    } catch (error) {
      toast.error("Hiba történt a foglalás törlése során");
    } finally {
      setIsModalOpen(false);
      setBookingIdToDelete(null);
    }
  };

  const handleUpdateBooking = (id) => {
    navigate(`/admin/booking/${id}/edit`);
  };

  const formatDate = (dateString) => {
    return dateString.substring(0, 10);
  };


  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    fetchBookings({ name: query, email: query });
  };

  const openDeleteModal = (id) => {
    setBookingIdToDelete(id);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 mb-32 px-4">
      <div className="w-full max-w-4xl mb-5 text-center">
        <h1 className="text-3xl font-bold mb-5">Foglalások listája</h1>
      </div>
      <div className="w-full max-w-4xl mb-5">
        <input
          type="text"
          placeholder="Keresés név vagy email alapján"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 border rounded mb-5"
        />
        <button
          type="button"
          onClick={() => navigate("/admin")}
          className="bg-gray-600 text-white py-2 px-4 mb-5 rounded"
        >
          Vissza az admin oldalra
        </button>
      </div>
      <div className="w-full max-w-6xl overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border-b">Foglalás id</th>
              <th className="py-2 px-4 border-b">Felhasználó név</th>
              <th className="py-2 px-4 border-b">Felhasználó email</th>
              <th className="py-2 px-4 border-b">Kezdődátum</th>
              <th className="py-2 px-4 border-b">Végdátum</th>
              <th className="py-2 px-4 border-b">Műveletek</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{booking.id}</td>
                <td className="py-2 px-4 border-b">{booking.userName}</td>
                <td className="py-2 px-4 border-b">{booking.userEmail}</td>
                <td className="py-2 px-4 border-b">{formatDate(booking.startDate)}</td>
                <td className="py-2 px-4 border-b">{formatDate(booking.endDate)}</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded"
                      onClick={() => openDeleteModal(booking.id)}
                    >
                      Törlés
                    </button>
                    <button
                      className="bg-blue-500 text-white py-1 px-3 rounded"
                      onClick={() => handleUpdateBooking(booking.id)}
                    >
                      Szerkesztés
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteBooking}
      />
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};