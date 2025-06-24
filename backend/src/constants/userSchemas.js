import * as Yup from 'yup';

export const createUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phoneNumber: Yup.number().required('Phone number is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
});

export const updateUserSchema = Yup.object().shape({
    name: Yup.string(),
    phoneNumber: Yup.number(),
    email: Yup.string().email('Invalid email format'),
    password: Yup.string().min(6, 'Password must be at least 6 characters long'),
});

export const changePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string().min(6, 'Old password must be at least 6 characters long').required('Old password is required'),
    newPassword: Yup.string().min(6, 'New password must be at least 6 characters long').required('New password is required'),
  });