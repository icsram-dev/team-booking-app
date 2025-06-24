import { useEffect } from "react";
import { Modal, Button } from "flowbite-react";
import { useFormik } from "formik";
import { userAccommodationSchema } from "../schemas/userAccommodationSchema";
import { updateUserAccommodation } from "../services/userAccommodationService";
import { upload } from "../services/cloudinaryService";
import { notify, errNotify } from "../constants/toostify";
import { ToastContainer } from "react-toastify";

export default function AccommodationModal({ openModal, setOpenModal, currentAccommodation, setAccommodation, user }) {
    const formik = useFormik({
        initialValues: {
            name: '',
            location: '',
            type: '',
            description: '',
            price: '',
            services: [],
            photos: [],
        },
        validationSchema: userAccommodationSchema,
        onSubmit: async (values, { setErrors, setSubmitting }) => {
            try {
                const result = await updateUserAccommodation(user.token, currentAccommodation.id, values);
                if (result.ok) {
                    await notify("Sikeres módosítás");
                    setOpenModal(false);
                    setAccommodation(prev => prev.map(acc => acc.id === currentAccommodation.id ? result.data : acc));
                } else {
                    setErrors({ submit: result.error });
                }
            } catch (error) {
                await errNotify("Sikertelen módosítás");
                setErrors({ submit: 'Frissítési hiba' });
            } finally {
                setSubmitting(false);
            }
        }
    });

    useEffect(() => {
        if (currentAccommodation) {
            formik.setValues({
                name: currentAccommodation.name,
                location: currentAccommodation.location,
                type: currentAccommodation.type,
                description: currentAccommodation.description,
                price: currentAccommodation.price,
                services: currentAccommodation.services,
                photos: currentAccommodation.photos,
            });
        }
    }, [currentAccommodation]);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const url = await upload(file);
                formik.setFieldValue('photos', [...formik.values.photos, url]);
            } catch (error) {
                console.error('File upload error:', error);
            }
        }
    };

    const serviceOptions = [
        "Reggeli",
        "Parkoló",
        "Wifi",
        "Erkély",
        "Étterem",
        "Szobaszerviz",
        "Állat vihető",
        "Lift",
        "Franciaágy",
        "Wellness",
        "Edzőterem"
      ];

    return (
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Szállás adatainak módosítása</Modal.Header>
            <Modal.Body>
                <ToastContainer position="top-right" autoClose={2000} />
                <div className="space-y-6">
                    <form onSubmit={formik.handleSubmit} className="max-w-sm lg:max-w-xl mx-auto gap-5" noValidate>
                        {formik.errors.submit && (
                            <span className="text-red-600 text-center">{formik.errors.submit}</span>
                        )}
                        <div className="max-w-sm lg:max-w-xl mx-auto grid grid-cols-2 gap-5">
                            <div className="mb-5">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Név</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder=""
                                    required
                                    {...formik.getFieldProps('name')}
                                />
                                {formik.touched.name && formik.errors.name && (
                                    <span className="text-red-600 text-sm">{formik.errors.name}</span>
                                )}
                            </div>
                            <div className="mb-5">
                                <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Helység név</label>
                                <input
                                    type="text"
                                    id="location"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder=""
                                    required
                                    {...formik.getFieldProps('location')}
                                />
                                {formik.touched.location && formik.errors.location && (
                                    <span className="text-red-600 text-sm">{formik.errors.location}</span>
                                )}
                            </div>
                            <div className="mb-5">
                                <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Szállás típusa</label>
                                <select
                                    id="type"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                    {...formik.getFieldProps('type')}
                                >
                                    <option value="">Válaszd ki a szállás típusát</option>
                                    <option value="Szálloda">Szálloda</option>
                                    <option value="Apartman">Apartman</option>
                                    <option value="Panzió">Panzió</option>
                                    <option value="Vendégház">Vendégház</option>
                                </select>
                                {formik.touched.type && formik.errors.type && (
                                    <span className="text-red-600 text-sm">{formik.errors.type}</span>
                                )}
                            </div>
                            <div className="mb-5">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Leírás</label>
                                <textarea
                                    type="text"
                                    id="description"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder=""
                                    required
                                    {...formik.getFieldProps('description')}
                                />
                                {formik.touched.description && formik.errors.description && (
                                    <span className="text-red-600 text-sm">{formik.errors.description}</span>
                                )}
                            </div>
                            <div className="mb-5">
                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ár/éjszaka/fő</label>
                                <input
                                    type="text"
                                    id="price"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder=""
                                    required
                                    {...formik.getFieldProps('price')}
                                />
                                {formik.touched.price && formik.errors.price && (
                                    <span className="text-red-600 text-sm">{formik.errors.price}</span>
                                )}
                            </div>
                            <div className="mb-5">
                                <label htmlFor="services" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Szolgáltatások</label>
                                <div className="grid grid-cols-2">
                                    {serviceOptions.map((service, index) => (
                                        <div key={index} className="items-center">
                                            <input
                                                id={`service-${index}`}
                                                type="checkbox"
                                                value={service}
                                                onChange={(event) => {
                                                    const { value, checked } = event.target;
                                                    if (checked) {
                                                        formik.setFieldValue('services', [...formik.values.services, value]);
                                                    } else {
                                                        formik.setFieldValue('services', formik.values.services.filter(service => service !== value));
                                                    }
                                                }}
                                                checked={formik.values.services.includes(service)}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label htmlFor={`service-${index}`} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{service}</label>
                                        </div>
                                    ))}
                                </div>
                                {formik.touched.services && formik.errors.services && (
                                    <span className="text-red-600 text-sm">{formik.errors.services}</span>
                                )}
                            </div>
                            <div className="mb-5">
                                <label htmlFor="photos" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fotók</label>
                                <input
                                    type="file"
                                    id="photos"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    onChange={handleFileUpload}
                                />
                                <div className="flex flex-wrap w-max gap-2 mt-2">
                                {formik.values.photos && formik.values.photos.map((url, index) => (
                                    <img key={index} src={url} alt={`Product Preview ${index}`} className="size-36 mt-2" />
                                ))}
                                </div>
                                {formik.touched.photos && formik.errors.photos && (
                                    <span className="text-red-600 text-sm">{formik.errors.photos}</span>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-center mt-5">
                            <button type="submit" className="lg:max-w-72 sm:max-w-48 text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                disabled={formik.isSubmitting}
                            >
                                {formik.isSubmitting ? 'Betöltés...' : 'Módosítás'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => setOpenModal(false)}>
                    Vissza
                </Button>
            </Modal.Footer>
        </Modal>

    );
}
