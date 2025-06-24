import { SocialIcon } from 'react-social-icons/component'
import 'react-social-icons/facebook'
import 'react-social-icons/instagram'
import 'react-social-icons/tiktok'
import 'react-social-icons/youtube'
import { FaPhone } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { MdCardTravel } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";
import { MdOutlineCopyright } from "react-icons/md";
import { useContext, useState } from 'react'
import { motion } from 'framer-motion';
import { slides } from '../constants/images'
import AuthContext from '../contexts/AuthContext'
import { userUpdate } from '../services/userService'
import { useNavigate } from 'react-router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { registerSchema } from '../schemas/registerSchema';

export default function Footer() {

    const notify = () => toast("Sikeres feliratkozás");
    const errNotify = () => toast.error("Sikertelen feliratkozás");

    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    const [email, setEmail] = useState('');
    const duplicatedSlides = [...slides, ...slides];

    const validationSchema = Yup.object().shape({
        email: registerSchema.fields.email
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const data = {
            "isSubscribedToNewsletter": true
        };
        try {
            await userUpdate(user.id, data);
            notify();
            resetForm();
        } catch {
            errNotify();
            resetForm();
            navigate('/login');
        } finally {
            setSubmitting(false);
        }
    };
    
    return (
        <>
        <footer className="px-4 md:px-16 py-6 bg-blue-800 flex flex-col text-lg">
            <div className='flex flex-col md:flex-row md:px-16 py-3 justify-between gap-5 mt-8 text-lg'>
                <div className="flex flex-col gap-2">
                    <h3 className="text-white font-bold tracking-wide mb-2">BestBooking.</h3>
                    <div className='flex text-sm items-center gap-2 text-white'>
                        <MdCardTravel className="text-white" />
                        <p>BestBooking Kft.</p>
                    </div>
                    <div className='flex text-sm items-center gap-2 text-white'>
                        <FaHome className="text-white" />
                        <p>1036 Budapest, Csemete utca 10.</p>
                    </div>
                    <div className='flex text-sm items-center gap-2 text-white'>
                        <FaPhone className="text-white" />
                        <p>+36 70 214 45 52</p>
                    </div>
                    <div className='flex text-sm items-center gap-2 text-white'>
                        <MdOutlineMail className="text-white" />
                        <p>info@bestbooking.com</p>
                    </div>
                </div>
            <ToastContainer position="top-right" autoClose={2000} />
                <div className="flex flex-col gap-2">
                    <h3 className="text-white font-bold tracking-wide mb-2">Hírlevél</h3>
                    <p className='text-sm text-white'>Iratkozz fel hírlevelünkre, hogy időben értesülj <br /> legfrissebb ajánlatainkról</p>
                    <Formik
                        initialValues={{ email: '' }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className='flex flex-col'>
                                <label className='text-white font-bold text-base tracking-wide mb-2'>Email cím:</label>
                                <Field className='bg-inherit border-b-2 text-white text-base focus:outline-none' type="email" name="email" />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                                <button className='mt-4 text-base text-white bg-black rounded-xl pb-1 pt-1 bg-opacity-45 hover:bg-opacity-20' type="submit" disabled={isSubmitting}>
                                    Feliratkozás
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            <div className="flex justify-center gap-8 mt-4 md:mt-0 text-lg">
                <a href="https://www.facebook.com/profile.php?id=61562664195932" target="_blank" rel="noopener noreferrer">
                    <SocialIcon bgColor="none" className="cursor-pointer border-2 rounded-full" network="facebook" />
                </a>
                <a href="https://www.instagram.com/bestbooking02/" target="_blank" rel="noopener noreferrer">
                    <SocialIcon bgColor="none" className="cursor-pointer border-2 rounded-full" network="instagram" />
                </a>
                <a href="https://www.tiktok.com/@bestbooking4" target="_blank" rel="noopener noreferrer">
                    <SocialIcon bgColor="none" className="cursor-pointer border-2 rounded-full" network="tiktok" />
                </a>
                <a href="https://www.youtube.com/@bestbooking2024fullstack" target="_blank" rel="noopener noreferrer">
                    <SocialIcon bgColor="none" className="cursor-pointer border-2 rounded-full" network="youtube" />
                </a>
            </div>
            <div className="relative h-28 mb-5 overflow-hidden py-12 bg-blue-800 mx-auto" style={{ width: "50%" }}>
                <div className="absolute inset-0 z-20 before:absolute before:left-0 before:top-0 before:w-1/4 before:h-full before:bg-gradient-to-r before:from-blue-800 before:to-transparent before:filter before:blur-3 after:absolute after:right-0 after:top-0 after:w-1/4 after:h-full after:bg-gradient-to-l after:from-blue-800 after:to-transparent after:filter after:blur-3"></div>
                <motion.div
                    className="flex"
                    animate={{
                        x: ['0%', '-100%'],
                        transition: {
                            ease: 'linear',
                            duration: 15,
                            repeat: Infinity,
                        }
                    }}
                >
                    {duplicatedSlides.map((slide, index) => (
                        <div key={index} className="flex-shrink-0" style={{ width: `${100 / slides.length}%` }}>
                            <div className="flex items-center justify-center h-full">
                                <img className='w-28' src={slide}></img>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
            <div className="px-4 md:px-16 py-3 gap-2 flex items-center justify-center">
                <MdOutlineCopyright className="text-white text-base" />
                <p className='text-white text-sm'>2024 BestBooking</p>
            </div>
        </footer>
        </>
    );
};