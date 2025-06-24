import React from 'react';

export default function BookingUpdateModal({ isOpen, onClose, onConfirm, }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
        <h2 className="text-lg font-semibold mb-4">Megerősítés szükséges</h2>
        <p className="mb-4">Valóban frissíteni szeretné a foglalását?</p>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
            onClick={onClose}
          >
            Mégse
          </button>
          <button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
            onClick={onConfirm}
          >
            Igen, frissítem
          </button>
        </div>
      </div>
    </div>
  );
}
