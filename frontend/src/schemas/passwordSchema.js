import * as yup from 'yup';

export const PasswordSchema = yup.object({
    oldPassword: yup.string().required('Régi jelszó megadása kötelező'),
    newPassword1: yup.string().required('Új jelszó megadása kötelező'),
    newPassword2: yup.string().oneOf([yup.ref('newPassword1'), null], 'A jelszavaknak egyezniük kell').required('Jelszó megerősítése kötelező')
});