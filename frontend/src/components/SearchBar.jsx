import { useState } from 'react';
import { FaHotel, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom';

export default function SearchBar() {

    const [search, setSearch] = useState("");

    const handleSearch = (event) => {
        const searchValue = event.target.value;
        setSearch(searchValue);
    }

    return (
        <div className="w-full max-w-xl mx-auto px-4 sm:px-0">
            <div
                className="relative bg-white p-2 shadow-lg rounded-lg border-2 border-yellow-400 space-x-2 flex items-center flex-col sm:flex-row">
                <div
                    className="flex items-center border-b-2 sm:border-b-0 sm:border-r-2 border-yellow-400 pb-2 sm:pb-0 sm:pr-4 flex-grow w-full sm:w-auto">
                    <FaHotel className="mr-2 w-5 h-5" />
                    <input
                        type="text"
                        value={search}
                        onChange={handleSearch}
                        placeholder="Balaton"
                        className="border-none outline-none flex-grow w-full sm:w-auto"
                    />
                </div>
                <Link to={'/accommodations?location=' + search} className="bg-blue-500 text-white py-2 px-4 rounded w-full sm:w-auto text-center sm:text-left mt-2 sm:mt-0">Keresés</Link>
            </div>
        </div>
    );
};