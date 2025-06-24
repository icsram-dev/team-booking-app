import * as Yup from 'yup';

export const createBookingSchema = Yup.object().shape({
    accommodationId: Yup.string().required('Accommodation ID is required'),
    startDate: Yup.date().required('Start date is required'),
    endDate: Yup.date().required('End date is required'),
    numberOfGuests: Yup.number()
        .required('Number of guests is required')
        .min(1, 'At least one guest is required'),
});

export const updateBookingSchema = Yup.object().shape({
    startDate: Yup.date(),
    endDate: Yup.date(),
});