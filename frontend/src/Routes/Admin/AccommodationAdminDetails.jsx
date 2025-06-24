import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getAccommodation,
  deleteAccommodation,
} from "../../services/accommodationService";
import AuthContext from "../../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AccommodationAdminDetails() {
  const { accommodationId } = useParams();
  const [accommodation, setAccommodation] = useState(null);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAccommodation();
  }, []);

  const fetchAccommodation = async () => {
    try {
      const data = await getAccommodation(accommodationId, user.token);
      setAccommodation(data);
    } catch (error) {
      toast.error("Hiba történt a szállás betöltése során:", error);
    }
  };

  const handleDeleteAccommodation = async () => {
    try {
      await deleteAccommodation(accommodationId, user.token);
      toast.success("Szállás sikeresen törölve");
      navigate("/admin/accommodations");
    } catch (error) {
      toast.error("Hiba történt a szállás törlése során");
    }
  };

  const handleEditAccommodation = () => {
    navigate(`/admin/accommodation/${accommodationId}/edit`);
  };

  if (!accommodation) return <div>Loading...</div>;

  return (
    <>
      <div className="flex justify-center items-center my-5">
        <h1 className="text-2xl pl-1 font-semibold">Szállás részletei</h1>
      </div>
      <div className="flex justify-center">
        <div className="w-7/12 bg-white p-5 rounded-lg shadow-lg">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Szállás neve
            </label>
            <p className="text-gray-900 text-xl mb-2">{accommodation.name}</p>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="location"
            >
              Helyszín
            </label>
            <p className="text-blue-400 text-lg mb-2">
              {accommodation.location}
            </p>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="type"
            >
              Típus
            </label>
            <p className="text-gray-700 text-lg mb-2">{accommodation.type}</p>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Ár
            </label>
            <p className="text-3xl text-gray-900 mb-2">{accommodation.price}</p>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Leírás
            </label>
            <p className="text-gray-700 text-lg mb-2">
              {accommodation.description}
            </p>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="services"
            >
              Szolgáltatások
            </label>
            <p className="text-gray-700 text-lg mb-2">
              {accommodation.services.join(', ')}
            </p>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="photos"
            >
              Képek
            </label>
            <div className="grid grid-cols-3 gap-4">
              {accommodation.photos.map((photo, index) => (
                <img
                  key={index}
                  className="object-cover w-full h-48 rounded-lg shadow-md"
                  src={photo}
                  alt={`Kép ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleEditAccommodation}
            >
              Szerkesztés
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleDeleteAccommodation}
            >
              Törlés
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000}/>
    </>
  );
}
