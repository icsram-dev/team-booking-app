import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Admin() {

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-10">Admin felület</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <button 
          className="bg-blue-500 text-white font-semibold py-4 px-8 rounded-lg shadow-md hover:bg-blue-700"
          onClick={() => navigate('/admin/users')}
        >
          Felhasználók
        </button>
        <button 
          className="bg-blue-500 text-white font-semibold py-4 px-8 rounded-lg shadow-md hover:bg-blue-700"
          onClick={() => navigate('/admin/accommodations')}
        >
          Szállások
        </button>
        <button 
          className="bg-blue-500 text-white font-semibold py-4 px-8 rounded-lg shadow-md hover:bg-blue-700"
          onClick={() => navigate('/admin/bookings')}
        >
          Foglalások
        </button>
      </div>
    </div>
  );
}