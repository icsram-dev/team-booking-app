import React, { useEffect, useState, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../contexts/AuthContext';
import { getFavourites, removeFavourite } from '../services/favouriteService';

export default function Favorites() {
  const [favourites, setFavourites] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    async function fetchFavourites() {
      try {
        const data = await getFavourites(user.token);
        setFavourites(data);
      } catch (err) {
        toast.error('Hiba történt a kedvencek betöltése során');
      }
    }
      fetchFavourites();
  }, [user]);

  const handleRemoveFavourite = async (id) => {
    try {
      if (user && user.token) {
        await removeFavourite(id, user.token);
        setFavourites(prevFavourites => prevFavourites.filter(fav => fav.id !== id));
        toast.success('Szállás eltávolítva a kedvencekből!');
      }
    } catch (error) {
      toast.error('Nem sikerült eltávolítani a kedvencet.');
    }
  };

  const truncateDescription = (description) => {
    return description.length > 100 ? `${description.slice(0, 100)}...` : description;
  };

  return (
    <>
      <div className="text-black text-2xl mt-5 flex justify-center mb-5">
        Kedvenc szállásaid ({favourites?.length})
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 mt-10 mb-5">
        {favourites?.map(favourite => (
          <div key={favourite.id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <img className="w-full h-48 object-cover" src={favourite.photos[0]} alt={favourite.name} />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900">{favourite.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{favourite.location}</p>
              <p className="text-sm text-gray-700">{truncateDescription(favourite.description)}</p>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => handleRemoveFavourite(favourite.id)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Eltávolítás
                </button>
              </div>
            </div>
          </div>
        ))}
        <ToastContainer position="top-right" autoClose={2000} />
      </div>
    </>
  );
}
