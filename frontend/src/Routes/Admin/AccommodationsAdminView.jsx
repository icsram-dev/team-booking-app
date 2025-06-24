import React, { useState, useEffect, useContext } from "react";
import { getAllAccommodation, deleteAccommodation } from "../../services/accommodationService";
import AuthContext from "../../contexts/AuthContext";
import { useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";
import DeleteModal from "../../components/DeleteAgreeModal";

export default function AccommodationsAdminView() {
  const [accommodations, setAccommodations] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accommodationIdToDelete, setAccommodationIdToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchData();
  }, [searchParams, currentPage, searchQuery]);

  const fetchData = async () => {
    const params = Object.fromEntries([...searchParams]);
    const data = await getAllAccommodation({
      ...params,
      minPrice: params.minPrice || 1,
      maxPrice: params.maxPrice || 1000000000,
      page: currentPage,
      search: searchQuery,
    });
    setAccommodations(data.accommodations || []);
    setTotalPages(data.totalPages || 1);
  };

  const handleDeleteAccommodation = async () => {
    try {
      await deleteAccommodation(accommodationIdToDelete, user.token);
      setAccommodations(accommodations.filter((a) => a.id !== accommodationIdToDelete));
      toast.success("Szállás sikeresen törölve");
    } catch (error) {
      toast.error("Csak olyan szállást törölhetsz, ahol nincs aktív foglalás!");
    } finally {
      setIsModalOpen(false);
      setAccommodationIdToDelete(null);
    }
  };

  const handleEditAccommodation = (accommodationId) => {
    navigate(`/admin/accommodation/${accommodationId}/edit`);
  };

  const handleImageClick = (accommodationId) => {
    navigate(`/admin/accommodation/${accommodationId}/details`);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const truncateDescription = (description) => {
    return description.length > 100 ? `${description.slice(0, 100)}...` : description;
  };

  const handleGoBack = () => {
    navigate('/admin');
  };

  const openDeleteModal = (accommodationId) => {
    setAccommodationIdToDelete(accommodationId);
    setIsModalOpen(true);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <div className="flex justify-center items-center my-5">
        <h1 className="text-2xl pl-1 font-semibold">Szállások adminisztráció</h1>
      </div>
      <div className="w-full flex justify-center">
        <input
          type="text"
          placeholder="Keresés név alapján"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 border rounded md:w-1/2"
        />
      </div>
      <div className="flex flex-col md:flex-row justify-center pt-10">
        <div className="w-full md:w-10/12">
          <div className="flex justify-between items-center mb-5">
            <button
              onClick={handleGoBack}
              className="text-white bg-gray-600 hover:bg-gray-700 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Vissza az admin oldalra
            </button>
          </div>
          <div>
            {accommodations.map((accommodation) => (
              <div key={accommodation.id} className="mb-5">
                <div className="bg-white border border-white rounded-lg shadow-md flex flex-col md:flex-row md:w-full hover:bg-white dark:border-grey-100 dark:bg-white dark:hover:bg-white">
                  <img
                    className="object-cover w-full md:w-56 h-60 rounded-t-lg md:rounded-lg cursor-pointer"
                    src={accommodation.photos[0]}
                    alt={accommodation.name}
                    onClick={() => handleImageClick(accommodation.id)}
                  />
                  <div className="flex flex-col justify-between p-4 flex-1">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-blue-500">
                      {accommodation.name}
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-700">
                      {truncateDescription(accommodation.description)}
                    </p>
                  </div>
                  <div className="flex flex-col justify-between items-center p-4 w-full md:w-56">
                    <h1 className="text-3xl w-full text-center mb-8">
                      {accommodation.price} Ft/éj
                    </h1>
                    <button
                      onClick={() => handleEditAccommodation(accommodation.id)}
                      className="w-full md:w-40 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Szerkesztés
                    </button>
                    <button
                      onClick={() => openDeleteModal(accommodation.id)}
                      className="w-full md:w-40 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                    >
                      Törlés
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      </div>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteAccommodation}
      />
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}
