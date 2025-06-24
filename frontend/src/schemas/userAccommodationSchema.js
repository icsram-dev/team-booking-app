import * as yup from 'yup';

export const userAccommodationSchema = yup.object({
    name: yup.string().required('A név megadása kötelező'),
    location: yup.string().required('A helység név megadása kötelező'),
    type: yup.string().required('A szállás típus megadása kötelező'),
    description: yup.string().required('A leírás megadása kötelező'),
    price: yup.number().required('Az ár megadása kötelező'),
});