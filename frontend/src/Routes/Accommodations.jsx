import { useState, useEffect, useContext } from "react";
import { getAllAccommodation } from "../services/accommodationService";
import AuthContext from "../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import AccommodationFilterComponent from "../components/AccommodationFilterComponent";
import "react-toastify/dist/ReactToastify.css";
import { addFavourite } from "../services/favouriteService";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/Pagination";

export default function Accommodations() {
  const [accommodations, setAccommodations] = useState([]);
  const { user } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [price, setPrice] = useState(5000);
  const [tempSearchParams, setTempSearchParams] = useState(Object.fromEntries([...searchParams]));
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const navigate = useNavigate();

  const handleResetFilters = () => {
    setTempSearchParams({});
    setSearchParams({});
    setCurrentPage(1);
    fetchData();
  };

  const fetchData = async () => {
    const params = Object.fromEntries([...searchParams]);
    const data = await getAllAccommodation({
      ...params,
      minPrice: params.minPrice || 1,
      maxPrice: params.maxPrice || 1000000000,
      page: currentPage
    });
    setAccommodations(data.accommodations || []);
    setTotalPages(data.totalPages || 1);
  };

  useEffect(() => {
    fetchData();
  }, [searchParams, currentPage]);

  const handleAddToFavourites = async (accommodationId) => {
    try {
      if (user && user.token) {
        await addFavourite(accommodationId, user.token);
        toast.success("Szállás hozzáadva a kedvencekhez!");
      } else {
        toast.error("Bejelentkezés után hozzáadhatod a kedvenceidhez!");
      }
    } catch (error) {
      toast.error("Hiba történt a kedvencekhez adás közben!");
    }
  };

  const handleSortClick = () => {
    setSearchParams(tempSearchParams);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const truncateDescription = (description) => {
    return description.length > 100 ? `${description.slice(0, 100)}...` : description;
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center pt-10 px-3">
        <AccommodationFilterComponent
          setTempSearchParams={setTempSearchParams}
          tempSearchParams={tempSearchParams}
          price={price}
          setPrice={setPrice}
          handleSortClick={handleSortClick}
          handleResetFilters={handleResetFilters}
        />
        <div className="w-full md:w-7/12">
          <div className=" md:flex-row justify-between items-center mb-5">
            <h1 className="text-2xl mb-5 pl-1 font-semibold">Szállás lista</h1>
          </div>
          <div>
            {accommodations && accommodations.length>0 ? null : (
              <div className="bg-red-100 text-red-800 border border-red-400 rounded p-4 mt-4">
                <h2 className="text-lg font-bold">Nincs a keresési feltételeknek megfelelő elem!</h2>
              </div>
            )}
            {accommodations.map((accommodation) => (
              <div key={accommodation.id} className="mb-5">
                <div className="bg-white border border-white rounded-lg shadow-md flex flex-col md:flex-row md:w-full hover:bg-white dark:border-grey-100 dark:bg-white dark:hover:bg-white">
                  <img className="object-cover w-full md:w-56 h-60 rounded-t-lg md:rounded-lg cursor-pointer" 
                  src={accommodation.photos[0]} 
                  alt={accommodation.name} 
                  onClick={() => navigate(`/accommodations/${accommodation.id}`)}
                  />
                  <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 onClick={() => navigate(`/accommodations/${accommodation.id}`)} className="cursor-pointer mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-blue-500">{accommodation.name}</h5>
                    <p className="mb-3 font-normal text-blue-400 dark:text-blue-400">{accommodation.location}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{truncateDescription(accommodation.description)}</p>
                  </div>
                  <div className="flex flex-col mr-5 justify-between items-center p-4 md:p-0">
                    <h1 className="text-3xl w-full text-right pb-5 md:pb-20">
                      {accommodation.price} Ft/éj
                    </h1>
                    <button
                      className="w-full md:w-40 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                      onClick={() => navigate(`/accommodations/${accommodation.id}`)}
                    >
                      Foglalás
                    </button>
                    <button
                      onClick={() => handleAddToFavourites(accommodation.id)}
                      className="w-full md:w-40 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                    >
                      Kedvencekhez
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}
