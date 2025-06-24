import { useContext } from "react";
import AuthContext from "../contexts/AuthContext.jsx";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import { loginSchema } from "../schemas/loginSchema.js";

export default function Login() {

  const { login } = useContext(AuthContext)
  const navigate = useNavigate('/')

  const [error, setError] = useState('')

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        const result = await login(values.email, values.password);
        if (!result.ok) setError(result.message)
        if (result.ok) {
          navigate('/');
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
            Jelentkezz be a fiókodba
          </h1>
          <form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto" noValidate>
            {formik.errors.submit && (
              <span className="text-red-600 text-center">{formik.errors.submit}</span>
            )}
            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input type="email"
                id="email"
                formik={formik}
                onChange={formik.handleChange}
                value={formik.values.email}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder=""
                required />
              {formik.touched.email && formik.errors.email && (
                <span className="text-red-600 text-sm">{formik.errors.email}</span>
              )}
            </div>
            <div className="mb-5">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jelszó</label>
              <input
                type="password"
                id="password"
                formik={formik}
                onChange={formik.handleChange}
                value={formik.values.password}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required />
              {formik.touched.password && formik.errors.password && (
                <span className="text-red-600 text-sm">{formik.errors.password}</span>
              )}
              {error && (
                <span className="text-red-600 text-center">
                  {error}
                </span>
              )}
            </div>
            <button type="submit" className=" text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Betöltés...' : 'Bejelentkezés'}
            </button>
            <p className="text-sm mt-6 font-light text-gray-500 dark:text-gray-400">
              Még nincs fiókod? {' '}
              <Link
                to="/registration"
                className="font-medium text-slate-600 hover:underline dark:text-amber-500"
              >
                Regisztráció
              </Link>
            </p>
          </form>

        </div>
      </div>
    </div>
  );
};