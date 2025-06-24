import { FaBookOpen, FaShieldAlt, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function ProfileSettings() {

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 mx-auto md:h-screen lg:py-0">
      <div className='w-full max-w-6xl mb-6 text-center'>
        <h1 className="text-3xl font-bold mb-2">Fiókbeállítások</h1>
        <p className='text-gray-600'> Booking.com felhasználói élmény beállítása</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-6xl">
        <Link to={`/user/edit`} className='w-full'>
          <button className="w-full h-28 px-6 py-4 bg-white border border-gray-300 rounded-lg shadow-sm text-left flex items-center">
            <FaUser className='text-2xl mr-4' />
            <div>
              <h1 className='text-lg font-bold'>Személyes adatok</h1>
              <p>Frissítse adatait és tudja meg, hogyan használjuk azokat.</p>
              <p className="mt-1 text-sm text-blue-600">Személyes adatok kezelése</p>
            </div>
          </button>
        </Link>

        <Link to={`/user/bookings`} className='w-full'>
          <button className="w-full h-28 px-6 py-4 bg-white border border-gray-300 rounded-lg shadow-sm text-left flex items-center">
            <FaBookOpen className='text-2xl mr-4' />
            <div>
              <h1 className="text-lg font-bold">Foglalásaim</h1>
              <p className="text-sm font-medium text-gray-600">Tekintse meg a korábbi foglalásait.</p>
              <p className="mt-1 text-sm text-blue-600">Foglalásaim kezelése</p>
            </div>
          </button>
        </Link>

        <Link to={`/user/security`} className='w-full'>
          <button className="w-full h-28 px-6 py-4 bg-white border border-gray-300 rounded-lg shadow-sm text-left flex items-center">
            <FaBookOpen className='text-2xl mr-4' />
            <div>
              <h1 className="text-lg font-bold">Biztonság</h1>
              <p className="text-sm font-medium text-gray-600">Frissítse biztonsági beállításait, állítson be biztonságos azonosítást vagy törölje fiókját.</p>
              <p className="mt-1 text-sm text-blue-600">Fiókbiztonság kezelése</p>
            </div>
          </button>
        </Link>

        <Link to={`/favourites`} className='w-full'>
          <button className="w-full h-28 px-6 py-4 bg-white border border-gray-300 rounded-lg shadow-sm text-left flex items-center">
            <FaBookOpen className='text-2xl mr-4' />
            <div>
              <h1 className="text-lg font-bold">Kedvencek</h1>
              <p className="text-sm font-medium text-gray-600">Tekintse meg kedvenc szállásait.</p>
              <p className="mt-1 text-sm text-blue-600">Kedvencek kezelése</p>
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
};