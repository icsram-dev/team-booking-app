import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUser, userUpdate } from "../../services/userService";
import AuthContext from "../../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditUser = () => {
  const { userId } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    isAdmin: false,
    isSubscribedToNewsletter: false,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser = await getUser(userId, user.token);
        setUserData(fetchedUser);
      } catch (error) {
        toast.error(
          "Hiba történt a felhasználó adatainak betöltése során:",
          error
        );
      }
    };
    fetchUser();
  }, [userId, user]);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userUpdate(userId, userData, user.token, user.isAdmin);
      navigate("/admin/users");
    } catch (error) {
      toast.error(
        "Hiba történt a felhasználó adatainak frissítése során:",
        error
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Felhasználó szerkesztése
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Név:
            </label>
            <input
              type="text"
              id="name"
              value={userData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Telefonszám:
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={userData.phoneNumber}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={userData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isAdmin"
              checked={userData.isAdmin}
              onChange={handleChange}
              className="rounded text-blue-500 focus:ring-blue-500 h-4 w-4 mr-2"
            />
            <label
              htmlFor="isAdmin"
              className="text-sm font-medium text-gray-700"
            >
              Admin
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isSubscribedToNewsletter"
              checked={userData.isSubscribedToNewsletter}
              onChange={handleChange}
              className="rounded text-blue-500 focus:ring-blue-500 h-4 w-4 mr-2"
            />
            <label
              htmlFor="isSubscribedToNewsletter"
              className="text-sm font-medium text-gray-700"
            >
              Feliratkozva a hírlevélre
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full mt-4"
          >
            Mentés
          </button>
          <button
          type="button"
          onClick={() => navigate("/admin/users")}
          className="bg-gray-700 hover:bg-gray-800 text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-4 focus:ring-gray-300"
        >
          Vissza
        </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={2000}/>
    </div>
  );
};

export default EditUser;
