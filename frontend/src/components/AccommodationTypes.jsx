import accommodationTypes from "../constants/accommodationTypes.js";
import { Link } from "react-router-dom";

export default function AccommodationTypes() {

    return (
        <div className="my-12 px-6">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold mb-2 text-center">
                    Keresés szállástípus alapján
                </h2>
                <div className="grid grid-cols-1 gap-y-4 md:grid-cols-4 md:gap-4">
                    {accommodationTypes.map((type, index) => (
                        <div
                            key={index}
                            className="col-span-1"
                        >
                            <Link
                                to={'/accommodations?type=' + type.type}
                                className="relative group block"
                            >
                                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <img
                                        src={type.image}
                                        alt={type.name}
                                        className="w-full h-64 object-cover rounded-lg"
                                    />
                                    <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 rounded-bl-lg px-3 py-2">
                                        <span className="text-white text-lg font-bold">{type.name}</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};