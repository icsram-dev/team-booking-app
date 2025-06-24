import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import { registerSchema } from "../schemas/registerSchema";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Registration() {

  const { register } = useContext(AuthContext)
  const navigate = useNavigate('/');

  const formik = useFormik({
    initialValues: {
      name: '',
      phoneNumber: '',
      email: '',
      password: '',
    },
    validationSchema: registerSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try { 
        const result = await register(values.name, values.phoneNumber, values.email, values.password);
        
        if (result.ok) {
          toast('Sikeres regisztráció', {
            onClose: () => navigate('/login')
          });
        } else {
          setErrors({ submit: result.error });
        }
      } catch (error) {
        console.error('Bejelentkezési hiba:', error);
        setErrors({ submit: 'Helytelen email vagy jelszó' });
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Regisztráció
          </h1>
          <form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto" noValidate>
            {formik.errors.submit && (
              <span className="text-red-600 text-center">{formik.errors.submit}</span>
            )}
            <div className="mb-5">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Név</label>
              <input
                type=""
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
                formik={formik}
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name && (
                <span className="text-red-600 text-sm">{formik.errors.name}</span>
              )}
            </div>
            <div className="mb-5">
              <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefonszám (pl: 06203331122)</label>
              <input
                type=""
                id="phoneNumber"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
                formik={formik}
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <span className="text-red-600 text-sm">{formik.errors.phoneNumber}</span>
              )}
            </div>
            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required
                formik={formik}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email && (
                <span className="text-red-600 text-sm">{formik.errors.email}</span>
              )}
            </div>
            <div className="mb-5">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jelszó</label>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                formik={formik}
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password && (
                <span className="text-red-600 text-sm">{formik.errors.password}</span>
              )}
            </div>

            <button type="submit" className=" text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Betöltés...' : 'Regisztráció'}
            </button>
            <p className="text-sm mt-6 font-light text-gray-500 dark:text-gray-400">
              Már van fiókod? {' '}
              <Link
                to="/login"
                className="font-medium text-slate-600 hover:underline dark:text-amber-500"
              >
                Bejelentkezés
              </Link>
            </p>
          </form>
          <ToastContainer position="top-right" autoClose={2000} />
        </div>
      </div>
    </div>
  );

}