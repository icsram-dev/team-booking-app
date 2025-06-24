import * as yup from 'yup';

export const loginSchema = yup.object({
    email: yup.string().email('Az email cím formátuma nem megfelelő').required('Az email cím megadása kötelező'),
    password: yup.string().required('A jelszó megadása kötelező')
});