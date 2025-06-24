import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, deleteUser } from "../../services/userService";
import AuthContext from "../../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteModal from "../../components/DeleteAgreeModal";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, [user]);

  const fetchUsers = async (query = "") => {
    try {
      const data = await getUsers(user.token, { name: query, email: query });
      const activeUsers = data.filter((u) => !u.isDeleted);
      setUsers(activeUsers);
    } catch (err) {
      toast.error("Hiba történt a felhasználók betöltése során");
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser(userIdToDelete, user.token);
      setUsers(users.filter((u) => u.id !== userIdToDelete));
      toast.success("Felhasználó törölve");
    } catch (error) {
      toast.error("Csak olyan felhasználót törölhetsz, akinek a szállása nem fogad vendéget!");
    } finally {
      setIsModalOpen(false);
      setUserIdToDelete(null);
    }
  };

  const handleEditUser = (userId) => {
    navigate(`/admin/user/${userId}/edit`);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    fetchUsers(event.target.value);
  };

  const handleGoBack = () => {
    navigate('/admin');
  };

  const openDeleteModal = (userId) => {
    setUserIdToDelete(userId);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 mb-32 px-4">
      <div className="flex flex-col w-full max-w-4xl mb-5">
        <h1 className="text-3xl font-bold mb-5 text-center">Felhasználók kezelése</h1>
        <input
          type="text"
          placeholder="Keresés név vagy email alapján"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 border rounded mb-5"
        />
        <div className="flex justify-start">
          <button
            type="button"
            onClick={handleGoBack}
            className="bg-gray-600 text-white py-2 px-4 mb-5 rounded self-center"
          >
            Vissza az admin oldalhoz
          </button>
        </div>
      </div>
      <div className="w-full max-w-4xl overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border-b">Név</th>
              <th className="py-2 px-4 border-b">Email</th>
              <th className="py-2 px-4 border-b text-right">Műveletek</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-100">
                <td
                  className="py-2 px-4 border-b cursor-pointer"
                  onClick={() => navigate(`/admin/user/${user.id}/details`)}
                >
                  {user.name}
                </td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b text-right">
                  <div className="inline-flex space-x-2">
                    <button
                      className="bg-red-500 text-white py-1 px-3 rounded"
                      onClick={() => openDeleteModal(user.id)}
                    >
                      Törlés
                    </button>
                    <button
                      className="bg-blue-500 text-white py-1 px-3 rounded"
                      onClick={() => handleEditUser(user.id)}
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
      <ToastContainer position="top-right" autoClose={2000} />
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteUser}
      />
    </div>
  );
};