import * as yup from 'yup';

const domainRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneNumberRegex = /^06\d{9}$/;

export const registerSchema = yup.object({
    name: yup.string().required('A név megadása kötelező'),
    phoneNumber: yup.string()
    .matches(phoneNumberRegex, 'A telefonszám formátuma nem megfelelő. Példa: 06203331122')
    .required('A telefonszám megadása kötelező'),
    email: yup.string()
    .email('Az email cím formátuma nem megfelelő')
    .matches(domainRegex, 'Az email cím domain része nem megfelelő')
    .required('Az email cím megadása kötelező'),
    password: yup.string().required('A jelszó megadása kötelező')
});