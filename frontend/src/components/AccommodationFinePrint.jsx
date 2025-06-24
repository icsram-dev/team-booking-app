import { useState } from 'react'

export default function AccommodationFinePrint() {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalToggle = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-8">
            <div className="bg-gray-50 p-4 rounded-md mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Apróbetűs rész</h2>
                </div>
                <p className="text-gray-500 mb-6">Fontos információk a szállás vendégeinek</p>
                <div className="bg-white p-4 rounded-md">
                    <p className="text-gray-700 mb-2">
                        <strong>Fontos!</strong> A recepció 07:00 és 23:00 óra között tart nyitva. Késői bejelentkezés és korai kijelentkezés is lehetséges, de fizetni csak a recepció nyitva tartási idejében lehet.
                    </p>
                    <p className="text-gray-700">
                        Ez a szállás a koronavírus (COVID-19) helyzetre reagálva biztonsági és egészségügyi óvintézkedéseket alkalmaz.
                    </p>
                </div>
            </div>
            <h2 className="text-2xl font-bold mb-4">Jogi információ</h2>
            <div className="bg-blue-50 p-4 rounded-md mb-8">
                <p className="text-gray-700">
                    Ezt a szálláshelyet hivatalos vendéglátó üzemelteti. Ez a címke nem releváns az adók, többek között az áfa és egyéb „közvetett adók” szempontjából, azonban az EU-ban hatályos fogyasztóvédelmi törvény miatt szükség van rá. A vendéglátóról itt talál további információkat:
                    <button
                        className="text-blue-500 underline"
                        onClick={handleModalToggle}>
                        a vendéglátó adatai
                    </button>.
                </p>
            </div>
            {isModalOpen && (
                <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
                    <div className='bg-white p-4 rounded-md max-w-md mx-auto relative w-11/12 md:w-auto'>
                        <button className="absolute top-2 right-2 text-gray-500" onClick={handleModalToggle}>x</button>
                        <h2 className="text-xl font-bold mb-4">Hivatásos vendéglátó</h2>
                        <p>
                            Azon vendéglátók, akik hivatásos vendéglátóként regisztráltak a Booking.comon,
                            jellemzően olyan szállásadók, akik számára a szálláshely(ek) kiadása jelenti az elsődleges
                            üzleti tevékenységet, illetve a fontos másodlagos bevételforrást.
                        </p>
                        <button
                            className='bg-blue-500 text-white px-4 py-2 rounded mt-4'
                            onClick={handleModalToggle}
                        >
                            Bezárás
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};