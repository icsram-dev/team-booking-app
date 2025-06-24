import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUser, deleteUser } from "../../services/userService";
import AuthContext from "../../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserDetails() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const { user: loggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const data = await getUser(userId, loggedInUser.token);
      setUser(data);
    } catch (error) {
      toast.error("Hiba történt a felhasználó betöltése során:", error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser(userId, loggedInUser.token);
      toast.success("Felhasználó sikeresen törölve");
      navigate("/admin/users");
    } catch (error) {
      toast.error("Hiba történt a felhasználó törlése során");
    }
  };

  const handleEditUser = () => {
    navigate(`/admin/user/${userId}/edit`);
  };

  if (!user) return <div>Loading...</div>;

  return (
    <>
      <div className="flex justify-center items-center my-5">
        <h1 className="text-2xl pl-1 font-semibold">Felhasználó részletei</h1>
      </div>
      <div className="flex justify-center">
        <div className="w-7/12 bg-white p-5 rounded-lg shadow-lg">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Név
            </label>
            <p className="text-gray-900 text-xl mb-2">{user.name}</p>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <p className="text-blue-400 text-lg mb-2">{user.email}</p>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phoneNumber"
            >
              Telefonszám
            </label>
            <p className="text-gray-700 text-lg mb-2">{user.phoneNumber}</p>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="isAdmin"
            >
              Adminisztrátor
            </label>
            <p className="text-gray-700 text-lg mb-2">
              {user.isAdmin ? "Igen" : "Nem"}
            </p>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="isSubscribedToNewsletter"
            >
              Hírlevélre feliratkozva
            </label>
            <p className="text-gray-700 text-lg mb-2">
              {user.isSubscribedToNewsletter ? "Igen" : "Nem"}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleEditUser}
            >
              Szerkesztés
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleDeleteUser}
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
