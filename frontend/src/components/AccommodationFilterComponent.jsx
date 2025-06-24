import { useEffect, useState } from "react";
import { Label } from "flowbite-react";
import { getAllAccommodation } from "../services/accommodationService";

export default function AccommodationFilterComponent({ setTempSearchParams, tempSearchParams, price, setPrice, handleSortClick, handleResetFilters }) {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchLocations = async () => {
            const data = await getAllAccommodation({ limit: 1000 });
            const locationSet = new Set(data.accommodations.map(acc => acc.location));
            setLocations(Array.from(locationSet));
        };
        fetchLocations();
    }, []);

    const handleFilterChange = (event, nameOverride) => {
        const { name, value, type, checked } = event.target;
        let newParams = { ...tempSearchParams };
      
        const paramName = nameOverride || name;
      
        if (type === 'checkbox') {
          const currentValues = newParams[paramName] ? newParams[paramName].split(',') : [];
          if (checked) {
            currentValues.push(value);
          } else {
            const index = currentValues.indexOf(value);
            if (index > -1) {
              currentValues.splice(index, 1);
            }
          }
          newParams[paramName] = currentValues.join(',');
        } else {
          newParams[paramName] = value;
        }
        setTempSearchParams(newParams);
      };

    return (
        <div id="filter" className="w-full md:w-1/4 lg:w-1/5 p-3 border border-gray-100 rounded-lg mr-0 md:mr-5">
            <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-black border-b border-gray-100">Szűrési feltételek beállítása</h2>
            <div className="border-b-2 pb-2">
                <h3 className="mb-2 text-md font-semibold text-gray-900 dark:text-black">Ár/fő/éj:</h3>
                <div id="price-range" className="mb-1 block">
                    <Label htmlFor="min-price" value="Minimum ár (Ft)" />
                    <input
                        id="min-price"
                        type="number"
                        min="0"
                        value={tempSearchParams.minPrice || ''}
                        onChange={(event) => handleFilterChange(event, 'minPrice')}
                        className="block w-full mt-2 p-2 border rounded"
                    />
                    <Label htmlFor="max-price" value="Maximum ár (Ft)" className="mt-4" />
                    <input
                        id="max-price"
                        type="number"
                        min="0"
                        value={tempSearchParams.maxPrice || ''}
                        onChange={(event) => handleFilterChange(event, 'maxPrice')}
                        className="block w-full mt-2 p-2 border rounded"
                    />
                </div>
            </div>
            <div className="border-b-2 mt-2 pb-2">
                <h3 className="mb-2 text-md font-semibold text-gray-900 dark:text-black">Helység:</h3>
                <ul className="space-y-1 text-gray-500 list-none list-inside dark:text-gray-800">
                    {locations.map((location) => (
                        <li key={location}>
                            <label>
                                <input
                                    type="checkbox"
                                    name="location"
                                    value={location}
                                    checked={(tempSearchParams.location || '').includes(location)}
                                    onChange={handleFilterChange}
                                />
                                {location}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="border-b-2 mt-2 pb-2">
                <h3 className="mb-2 text-md font-semibold text-gray-900 dark:text-black">Szállás típus:</h3>
                <ul className="space-y-1 text-gray-500 list-none list-inside dark:text-gray-800">
                    {['szálloda', 'panzió', 'apartman', 'vendégház'].map((type) => (
                        <li key={type}>
                            <label>
                                <input
                                    type="checkbox"
                                    name="type"
                                    value={type}
                                    checked={(tempSearchParams.type || '').includes(type)}
                                    onChange={handleFilterChange}
                                />
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-2">
                <h3 className="mb-2 text-md font-semibold text-gray-900 dark:text-black">Szolgáltatások:</h3>
                <ul className="space-y-1 text-gray-500 list-none list-inside dark:text-gray-800">
                    {['Reggeli', 'Parkoló', 'Wifi', 'Erkély', 'Étterem', 'Szobaszervíz', 'Állat', 'Lift', 'Franciaágy'].map((service) => (
                        <li key={service}>
                            <label>
                                <input
                                    type="checkbox"
                                    name="services"
                                    value={service}
                                    checked={(tempSearchParams.services || '').includes(service)}
                                    onChange={handleFilterChange}
                                />
                                {service.charAt(0).toUpperCase() + service.slice(1)}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-col mt-5 mb-20 w-full justify-center items-center">
            <div className="mt-4">
                <button onClick={handleSortClick} className="w-full md:w-40 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2">Keresés indítása</button>
            </div>
            <div className="mt-4">
                <button onClick={handleResetFilters} className="border border-red-500 text-red-500 hover:bg-red-400 hover:text-white py-1 px-8 rounded-lg">Szűrés törlése</button>
            </div>
            </div>
        </div>
    );
};