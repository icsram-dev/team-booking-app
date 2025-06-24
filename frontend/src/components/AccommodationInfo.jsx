import { FaChild, FaCreditCard, FaInfoCircle, FaPaw, FaSignInAlt, FaSignOutAlt, FaSmokingBan, FaUser } from "react-icons/fa";

    export default function AccommodationInfo() {
      return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Fontos tudnivalók</h2>
          </div>
          <p className="text-gray-500 mb-6">A Hotel különleges kéréseket is elfogad - írja meg az Önét a következő lépésben!</p>
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 items-center border-b pb-2">
                <div className="flex items-center space-x-2 col-span-1">
                  <FaSignInAlt />
                  <span className="font-semibold">Bejelentkezés</span>
                </div>
                <span className="col-span-2 text-left">14:00 és 18:00 között</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 items-center border-b pb-2">
                <div className="flex items-center space-x-2 col-span-1">
                  <FaSignOutAlt />
                  <span className="font-semibold">Kijelentkezés</span>
                </div>
                <span className="col-span-2 text-left">11-ig tart</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 items-center border-b pb-2">
                <div className="flex items-center space-x-2 col-span-1">
                  <FaInfoCircle />
                  <span className="font-semibold">Lemondás / előzetes fizetés</span>
                </div>
                <p className="col-span-2 text-left text-gray-500">A lemondási és előrefizetési szabályzatok szállástípusonként változnak. Kérjük, kiválasztáskor nézze meg az adott lehetőségre vonatkozó feltételeket.</p>
              </div>
              <div className="border-b pb-2">
                <div className="grid grid-cols-1 md:grid-cols-3 items-start">
                  <div className="flex items-center space-x-2 col-span-1">
                    <FaChild />
                    <span className="font-semibold">Kiságyak • Pótágyak</span>
                  </div>
                  <div className="col-span-2 text-left">
                    <p className="font-semibold">Gyermekekre vonatkozó szabályzatok</p>
                    <p className="text-gray-500">Bármilyen korú gyereket szívesen látnak.</p>
                    <p className="text-gray-500">Hogy az összeg és a létszám-információ helyesen jelenjen meg, kérjük, adja hozzá a kereséséhez a társaságában utazó gyermekek számát és életkorát.</p>
                    <p className="font-semibold mt-2">Kiságyra és pótágyra vonatkozó szabályzatok</p>
                    <p className="text-gray-500">Ezen a szálláson nem kérhető sem pótágy, sem kiságy.</p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 items-center border-b pb-2">
                <div className="flex items-center space-x-2 col-span-1">
                  <FaUser />
                  <span className="font-semibold">Nincs korhatár</span>
                </div>
                <span className="col-span-2 text-left text-gray-500">Életkortól függetlenül bárki megszállhat a szálláson</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 items-center border-b pb-2">
                <div className="flex items-center space-x-2 col-span-1">
                  <FaPaw />
                  <span className="font-semibold">Házi kedvencek</span>
                </div>
                <span className="col-span-2 text-left text-gray-500">Kisállatok nem szállásolhatók el.</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 items-center border-b pb-2">
                <div className="flex items-center space-x-2 col-span-1">
                  <FaCreditCard />
                  <span className="font-semibold">Elfogadott fizetési módok</span>
                </div>
                <div className="col-span-2 text-left flex items-center space-x-2">
                  <img src="/visa.png" alt="Visa" className="h-6" />
                  <img src="/mastercard.png" alt="MasterCard" className="h-6" />
                  <span className="text-white bg-green-500 rounded h-6 px-2">Készpénz</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 items-center pb-2">
                <div className="flex items-center space-x-2 col-span-1">
                  <FaSmokingBan />
                  <span className="font-semibold">Dohányzás</span>
                </div>
                <span className="col-span-2 text-left text-gray-500">Tilos dohányozni.</span>
              </div>
            </div>
          </div>
        </div>
      );
    };