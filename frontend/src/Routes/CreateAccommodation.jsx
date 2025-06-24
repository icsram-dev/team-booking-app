import { userAccommodationSchema } from "../schemas/userAccommodationSchema.js";
import { useFormik } from "formik";
import { createUserAccommodation } from "../services/userAccommodationService.js";
import AuthContext from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router";
import { useContext, useState } from "react";
import { openUploadWidget } from "../services/cloudinaryService.js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function UserAccommodationCreate() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [preview, setPreview] = useState([]);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);

  const notify = () => {
    return new Promise((resolve) => {
      toast("Sikeres létrehozás");
      setTimeout(resolve, 2500);
    });
  };
  const errNotify = () => {
    return new Promise((resolve) => {
      toast.error("Sikertelen létrehozás");
      setTimeout(resolve, 2500);
    });
  };

  const handleFileUpload = () => {
    openUploadWidget((url) => {
      setUploadedPhotos((prevPhotos) => [...prevPhotos, url]);
      setPreview((prevPreview) => [...prevPreview, url]);
    });
  };

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
        values.photos = uploadedPhotos;
        const result = await createUserAccommodation(user.token, values.name, values.location, values.type, values.description, values.price, values.services, values.photos);
        if (result.ok) {
          await notify();
          navigate(`/accommodation/user/${user.id}`);
        } else {
          setErrors({ submit: result.error });
        }
      } catch (error) {
        await errNotify();
        console.error('Bejelentkezési hiba:', error);
        setErrors({ submit: 'Helytelen token' });
      } finally {
        setSubmitting(false);
      }
    }
  });

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

  const handleServiceChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      formik.setFieldValue('services', [...formik.values.services, value]);
    } else {
      formik.setFieldValue('services', formik.values.services.filter(service => service !== value));
    }
  };

  return (
    <div className="min-h-screen mt-20 mb-20 px-4 sm:px-6 lg:px-8">
      <div className="inset-0 flex flex-col items-center justify-center py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md lg:max-w-2xl mx-auto xl:p-0 dark:bg-gray-800 dark:border-gray-700 overflow-auto max-h-full">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Szállás létrehozás
            </h1>
            <form onSubmit={formik.handleSubmit} className="space-y-6" noValidate>
              {formik.errors.submit && (
                <span className="text-red-600 text-center">{formik.errors.submit}</span>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="mb-5">
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Név</label>
                  <input
                    type="text"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                    onChange={formik.handleChange}
                    value={formik.values.name}
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
                    onChange={formik.handleChange}
                    value={formik.values.location}
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
                    id="description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    required
                    onChange={formik.handleChange}
                    value={formik.values.description}
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
                    onChange={formik.handleChange}
                    value={formik.values.price}
                  />
                  {formik.touched.price && formik.errors.price && (
                    <span className="text-red-600 text-sm">{formik.errors.price}</span>
                  )}
                </div>
                <div className="mb-5 md:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Szolgáltatások</label>
                  <div className="grid grid-cols-2">
                    {serviceOptions.map((service, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          id={`service-${index}`}
                          type="checkbox"
                          value={service}
                          onChange={handleServiceChange}
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
                <div className="mb-5 md:col-span-2">
                  <label htmlFor="photos" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fotók</label>
                  <button
                    type="button"
                    onClick={handleFileUpload}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    Képek feltöltése
                  </button>
                  <div className="flex flex-wrap w-full gap-2 mt-2">
                    {preview && preview.map((url, index) => (
                      <img key={index} src={url} alt={`Product Preview ${index}`} className="h-36 w-36 object-cover" />
                    ))}
                  </div>
                  {formik.touched.photos && formik.errors.photos && (
                    <span className="text-red-600 text-sm">{formik.errors.photos}</span>
                  )}
                </div>
              </div>
              <div className="flex justify-center mt-5">
                <button
                  type="submit"
                  className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full max-w-xs px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? 'Betöltés...' : 'Létrehozás'}
                </button>
                <ToastContainer position="top-right" autoClose={2000} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};