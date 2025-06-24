import { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { PasswordSchema } from "../schemas/passwordSchema.js";
import AuthContext from "../contexts/AuthContext.jsx";
import { updateUserPassword } from "../services/userService.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";

export default function EditUserPassword() {
    const { user, token } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = (values, { setSubmitting }) => {
        updateUserPassword(token, user.id, values.oldPassword, values.newPassword1)
        .then(() => {
            toast('Sikeres jelszó módosítás', {
                onClose: () => {
                    setTimeout(() => {
                        navigate('/user/profilesettings');
                    }, 10);
                }
            });
        })
            .catch((error) => toast.error('Sikertelen jelszó módosítás'))
            .finally(() => setSubmitting(false));
    };

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <div className="flex justify-between items-center">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Jelszó módosítása
                        </h1>
                        <button
                            onClick={() => navigate("/user/profilesettings")}
                            className="bg-gray-600 text-white py-2 px-4 rounded"
                        >
                            Vissza
                        </button>
                    </div>
                    <Formik
                        initialValues={{
                            oldPassword: '',
                            newPassword1: '',
                            newPassword2: ''
                        }}
                        validationSchema={PasswordSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="max-w-sm mx-auto">
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="oldPassword">
                                        Régi jelszó
                                    </label>
                                    <Field
                                        type="password"
                                        name="oldPassword"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                    <ErrorMessage name="oldPassword" component="div" className="text-red-500 text-xs italic" />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="newPassword1">
                                        Új jelszó
                                    </label>
                                    <Field
                                        type="password"
                                        name="newPassword1"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                    <ErrorMessage name="newPassword1" component="div" className="text-red-500 text-xs italic" />
                                </div>
                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="newPassword2">
                                        Új jelszó megerősítése
                                    </label>
                                    <Field
                                        type="password"
                                        name="newPassword2"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                    <ErrorMessage name="newPassword2" component="div" className="text-red-500 text-xs italic" />
                                </div>
                                <div className="mb-4">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        Mentés
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <ToastContainer position="top-right" autoClose={2000} />
                </div>
            </div>
        </div>
    );
}
