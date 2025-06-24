import * as Yup from 'yup';

export const createAccommodationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    location: Yup.string().required('Location is required'),
    type: Yup.string().required('Type is required'),
    description: Yup.string().required('Description is required'),
    price: Yup.number().required('Price is required').positive('Price must be a positive number'),
    services: Yup.array().of(Yup.string()).required('Services are required'),
    photos: Yup.array().of(Yup.mixed()).required('Photos are required'),
});

export const updateAccommodationSchema = Yup.object().shape({
    name: Yup.string(),
    location: Yup.string(),
    type: Yup.string(),
    description: Yup.string(),
    price: Yup.number().positive('Price must be a positive number'),
    services: Yup.array().of(Yup.string()),
    photos: Yup.array().of(Yup.string()),
    ownerId: Yup.string(),
});