import { useContext, useEffect, useState } from "react";
import { getAllUserAccommodation, deleteUserAccommodation } from "../services/userAccommodationService";
import AuthContext from "../contexts/AuthContext";
import { Button } from "flowbite-react";
import { deleteImage } from "../services/cloudinaryService";
import { notify, errNotify } from "../constants/toostify";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from 'react-router-dom';
import AccommodationModal from "../components/AccommodationModal";
import FilterComponent from "../components/FilterComponent";
import Pagination from "../components/Pagination";
import DeleteModal from "../components/DeleteAgreeModal";

export default function UserAccommodation() {
    const { user } = useContext(AuthContext);

    const [accommodation, setAccommodation] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [currentAccommodation, setCurrentAccommodation] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [price, setPrice] = useState(5000);
    const [tempSearchParams, setTempSearchParams] = useState(Object.fromEntries([...searchParams]));
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [accommodationIdToDelete, setAccommodationIdToDelete] = useState(null);

    const fetchData = async () => {
        const params = Object.fromEntries([...searchParams]);
        const data = await getAllUserAccommodation(user.token, {
            ...params,
            minPrice: params.minPrice || 1,
            maxPrice: params.maxPrice || 1000000000,
            page: currentPage
        });
        setAccommodation(data.accommodations || []);
        setTotalPages(data.totalPages || 1);
    };

    const handleResetFilters = () => {
        setTempSearchParams({});
        setSearchParams({});
        setCurrentPage(1);
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, [searchParams, currentPage]);

    const handleUpdateClick = (accommodation) => {
        setCurrentAccommodation(accommodation);
        setOpenModal(true);
    };

    const handleDeleteClick = (accommodationId) => {
        setAccommodationIdToDelete(accommodationId);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const accommodationToDelete = accommodation.find(acc => acc.id === accommodationIdToDelete);
            if (accommodationToDelete && accommodationToDelete.photos.length > 0) {
                const deleteImagePromises = accommodationToDelete.photos.map(photoUrl => {
                    const publicId = extractPublicIdFromUrl(photoUrl);
                    return deleteImage(publicId);
                });
                await Promise.all(deleteImagePromises);
            }
            const result = await deleteUserAccommodation(user.token, accommodationIdToDelete);
            if (result.ok) {
                await notify("Sikeres törlés");
                setAccommodation(prev => prev.filter(acc => acc.id !== accommodationIdToDelete));
            }
        } catch (error) {
            await errNotify("Sikertelen törlés");
        } finally {
            setIsDeleteModalOpen(false);
            setAccommodationIdToDelete(null);
        }
    };

    const extractPublicIdFromUrl = (url) => {
        const parts = url.split('/');
        const publicIdWithExtension = parts[parts.length - 1];
        const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, "");
        return publicId;
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
                <FilterComponent
                    user={user}
                    setTempSearchParams={setTempSearchParams}
                    tempSearchParams={tempSearchParams}
                    price={price}
                    setPrice={setPrice}
                    handleSortClick={handleSortClick}
                    handleResetFilters={handleResetFilters}
                />
                <div className="w-full md:w-7/12">
                    <div className="mb-5">
                        <h1 className="text-2xl mb-5 pl-1 font-semibold">Saját szállásaim áttekintése</h1>
                    </div>
                    <div>
                        {accommodation && accommodation.length > 0 ? null : (
                            <div className="bg-red-100 text-red-800 border border-red-400 rounded p-4 mt-4">
                                <h2 className="text-lg font-bold">Nincs a keresési feltételeknek megfelelő elem!</h2>
                            </div>
                        )}
                        {accommodation.map((accommodation) => (
                            <div key={accommodation.id} className="mb-5">
                                <a href="#" className="flex justify-between flex-col md:flex-row bg-white border border-white rounded-lg shadow hover:bg-white dark:border-grey-100 dark:bg-white dark:hover:bg-white">
                                    <img className="object-cover w-full md:w-56 h-60 rounded-t-lg md:rounded-lg cursor-pointer" src={accommodation.photos[0]} alt=""></img>
                                    <div className="flex flex-1 flex-col justify-between p-4 leading-normal">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-blue-500">{accommodation.name}</h5>
                                        <p className="mb-3 font-normal text-blue-400 dark:text-blue-400">{accommodation.location}</p>
                                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{truncateDescription(accommodation.description)}</p>
                                    </div>
                                    <div className="flex flex-col mr-5 justify-between items-center md:items-end p-4 md:p-0">
                                        <h1 className="text-3xl w-full text-right pb-5 md:pb-20">
                                            {accommodation.price} Ft/éj
                                        </h1>
                                        <Button onClick={() => handleUpdateClick(accommodation)} type="button" className="w-full md:w-40 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-1 mb-2">
                                            Módosítás
                                        </Button>
                                        <button onClick={() => handleDeleteClick(accommodation.id)} type="button" className="w-full md:w-40 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2">
                                            Törlés
                                        </button>
                                        <ToastContainer position="top-right" autoClose={2000} />
                                    </div>
                                </a>
                            </div>
                        ))}
                    </div>
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </div>
                <AccommodationModal
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    currentAccommodation={currentAccommodation}
                    setAccommodation={setAccommodation}
                    user={user}
                />
                <DeleteModal
                    isOpen={isDeleteModalOpen}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={handleConfirmDelete}
                />
            </div>
        </>
    );
};