import destinations from "../constants/destinations.js"
import { Link } from 'react-router-dom'

export default function PopularDestinations() {
  return (
    <div className="my-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Felkapott úti célok
        </h2>
        <p className="mb-8 text-center">
          Magyarországi lehetőségeket kereső utazóink ezeket is foglalták
        </p>
        <div className="grid grid-cols-1 gap-y-4 md:grid-cols-3 md:gap-4">
          <div className="col-span-1 md:col-span-2">
            <Link to="/accommodations?location=Budapest"
              className="relative group block"
            >
              <img
                src={destinations[0].image}
                alt={destinations[0].name}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 rounded-bl-lg px-3 py-2">
                <span className="text-white text-lg font-bold">
                  {destinations[0].name} {destinations[0].country}
                </span>
              </div>
            </Link>
          </div>
          <div className="col-span-1 md:col-span-1">
            <Link to="/accommodations?location=Párizs"
              className="relative group block h-full"
            >
              <img
                src={destinations[1].image}
                alt={destinations[1].name}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 rounded-bl-lg px-3 py-2">
                <span className="text-white text-lg font-bold">
                  {destinations[1].name}
                </span>
              </div>
            </Link>
          </div>
          <div className="col-span-1">
            <Link to="/accommodations?location=Prága"
              className="relative group block h-full">
              <img
                src={destinations[2].image}
                alt={destinations[2].name}
                className="w-full h-full object-cover rounded-lg" />
              <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 rounded-bl-lg px-3 py-2">
                <span className="text-white text-lg font-bold">
                  {destinations[2].name}
                </span>
              </div>
            </Link>
          </div>
          <div className="col-span-1">
            <Link to="/accommodations?location=Szingapúr"
              className="relative group block h-full">
              <img
                src={destinations[3].image}
                alt={destinations[3].name}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 rounded-bl-lg px-3 py-2">
                <span className="text-white text-lg font-bold">
                  {destinations[3].name}
                </span>
              </div>
            </Link>
          </div>
          <div className="col-span-1">
            <Link to="/accommodations?location=Sydney"
              className="relative group block h-full">
              <img
                src={destinations[4].image}
                alt={destinations[4].name}
                className="w-full h-full object-cover rounded-lg" />
              <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 rounded-bl-lg px-3 py-2">
                <span className="text-white text-lg font-bold">
                  {destinations[4].name}</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};