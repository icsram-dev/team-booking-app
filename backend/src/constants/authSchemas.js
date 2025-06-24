import * as Yup from 'yup';

export const registerSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phoneNumber: Yup.number().required('Phone number is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
});

export const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
});