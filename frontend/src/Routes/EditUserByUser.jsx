import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userUpdate, getUser } from "../services/userService.js";

export default function EditUserByUser() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phoneNumber: ""
    });

    const notify = (message, type) => {
        return new Promise((resolve) => {
            if (type === "success") {
                toast.success(message, {
                    onClose: resolve
                });
            } else if (type === "error") {
                toast.error(message, {
                    onClose: resolve
                });
            }
        });
    };

    const [editFields, setEditFields] = useState({
        name: false,
        email: false,
        phoneNumber: false,
    });

    const [errorMessages, setErrorMessages] = useState({
        email: ""
    });

    const phoneNumberRegex = /^06\d{9}$/;

    function validatePhoneNumber(phoneNumber) {
        return phoneNumberRegex.test(phoneNumber);
    }

    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email)
    }

    async function saveUserData(field) {
        if (field === 'email' && !validateEmail(userData.email)) {
            setErrorMessages({
                ...errorMessages,
                email: "Helytelen email formátum!"
            });
            return;
        } else if (field === 'phoneNumber' && !validatePhoneNumber(userData.phoneNumber)) {
            setErrorMessages({
                ...errorMessages,
                phoneNumber: "Helytelen telefonszám formátum!"
            });
            return;
        } else {
            setErrorMessages({
                ...errorMessages,
                email: "",
                phoneNumber: ""
            });
        }
        try {
            await userUpdate(user.id, userData, user.token);
            await notify("Sikeres mentés", "success");
            handleCancel(field);
        } catch (error) {
            console.error("Failed to save user data:", error);
            await notify("Sikertelen mentés", "error");
        }
    }

    function handleEditClick(field) {
        setEditFields({
            ...editFields,
            [field]: true,
        });
    }

    function handleCancel(field) {
        setEditFields({
            ...editFields,
            [field]: false,
        });
    }

    function editUserData(e) {
        setUserData({
            ...userData,
            [e.target.id]: e.target.value
        });
    }

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await getUser(user.id, user.token);
                setUserData(data);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        }
        if (user && user.token) {
            fetchUserData();
        }
    }, [user])

    return (
        <>
            <div className="min-h-screen flex justify-center items-center px-4">
                <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-md flex flex-col justify-center">
                    <div className="flex justify-between mb-4">
                        <h1 className="text-2xl font-bold mb-2">Személyes adatok</h1>
                        <button
                            onClick={() => navigate("/user/profilesettings")}
                            className="bg-gray-600 text-white py-2 px-4 rounded"
                        >
                            Vissza
                        </button>
                    </div>
                    <p className="text-gray-600 mb-4">Frissítse adatait és tudja meg, hogyan hasznosítjuk azokat.</p>
                    <div className="divide-y divide-gray-200">
                        <div className="py-4">
                            <span className="block font-medium">Név</span>
                            {editFields.name ? (
                                <div className="mt-2">
                                    <div className="flex flex-col">
                                        <input
                                            onChange={editUserData}
                                            value={userData.name}
                                            id="name"
                                            type="text"
                                            className="mt-1 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                            placeholder="Név"
                                        />
                                    </div>
                                    <div className="flex justify-end mt-2 space-x-2">
                                        <button className="text-blue-500" onClick={() => handleCancel('name')}>Mégse</button>
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => saveUserData('name')}>Mentés</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex flex-col">
                                        <span>{userData.name}</span>
                                    </div>
                                    <button className="text-blue-500 ml-2" onClick={() => handleEditClick('name')}>Szerkesztés</button>
                                </div>
                            )}
                        </div>
                        <div className="py-4">
                            <span className="block font-medium">E-mail cím</span>
                            {editFields.email ? (
                                <div className="mt-2">
                                    <div className="flex flex-col">
                                        <input
                                            onChange={editUserData}
                                            value={userData.email}
                                            id="email"
                                            type="email"
                                            className="mt-1 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                            placeholder="E-mail cím"
                                        />
                                        {errorMessages.email && (
                                            <div className="text-red-600 mt-2">{errorMessages.email}</div>
                                        )}
                                    </div>
                                    <div className="flex justify-end mt-2 space-x-2">
                                        <button className="text-blue-500" onClick={() => handleCancel('email')}>Mégse</button>
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => saveUserData('email')}>Mentés</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex flex-col">
                                        <span>{userData.email}</span>
                                    </div>
                                    <button className="text-blue-500 ml-2" onClick={() => handleEditClick('email')}>Szerkesztés</button>
                                </div>
                            )}
                        </div>
                        <div className="py-4">
                            <span className="block font-medium">Telefonszám</span>
                            {editFields.phoneNumber ? (
                                <div className="mt-2">
                                    <div className="flex flex-col">
                                        <input
                                            onChange={editUserData}
                                            value={userData.phoneNumber}
                                            id="phoneNumber"
                                            type="tel"
                                            className="mt-1 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                                            placeholder="+36 1 234 5678"
                                        />
                                        {errorMessages.phoneNumber && (
                                            <div className="text-red-600 mt-2">{errorMessages.phoneNumber}</div>
                                        )}
                                    </div>
                                    <div className="flex justify-end mt-2 space-x-2">
                                        <button className="text-blue-500" onClick={() => handleCancel('phoneNumber')}>Mégse</button>
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => saveUserData('phoneNumber')}>Mentés</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex flex-col">
                                        <span>{userData.phoneNumber}</span>
                                    </div>
                                    <button className="text-blue-500 ml-2" onClick={() => handleEditClick('phoneNumber')}>Szerkesztés</button>
                                </div>
                            )}
                        </div>
                        <ToastContainer position="top-right" autoClose={2000} />
                    </div>
                </div>
            </div>
        </>
    );
};
