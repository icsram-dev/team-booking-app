import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getAccommodation,
  updateAccommodation,
} from "../../services/accommodationService";
import AuthContext from "../../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditAccommodation() {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "services") {
      const servicesArray = value.split(',').map(service => service.trim());
      setAccommodation((prev) => ({ ...prev, [name]: servicesArray }));
    } else {
      setAccommodation((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAccommodation(accommodationId, accommodation, user.token);
      toast.success("Szállás sikeresen frissítve");
      navigate("/admin/accommodations");
    } catch (error) {
      toast.error("Hiba történt a szállás frissítése során");
    }
  };

  if (!accommodation) return <div>Loading...</div>;

  return (
    <>
      <div className="flex justify-center items-center my-5">
        <h1 className="text-2xl pl-1 font-semibold">Szállás szerkesztése</h1>
      </div>
      <div className="flex justify-center">
        <form
          className="w-full max-w-3xl bg-white p-5 rounded-lg shadow-lg"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Szállás neve
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              value={accommodation.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="location"
            >
              Helyszín
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="location"
              type="text"
              name="location"
              value={accommodation.location}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="type"
            >
              Típus
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="type"
              type="text"
              name="type"
              value={accommodation.type}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Ár
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="price"
              type="number"
              name="price"
              value={accommodation.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Leírás
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              name="description"
              value={accommodation.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="services"
            >
              Szolgáltatások
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="services"
              name="services"
              value={accommodation.services.join(', ')}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => navigate("/admin/accommodations")}
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