import * as yup from 'yup';

export const signupSchema = yup.object().shape({
  email: yup.string().email('Te rugam sa introduci o adresa de email valida').required('Adresa de email este obligatorie'),
  password: yup.string().min(6, 'Parola trebuie sa contina minimum 6 caractere').required('Parola este obligatorie'),
  firstName: yup.string().required('Te rugam sa introduci prenumele'),
  lastName: yup.string().required('Te rugam sa introduci numele de familie'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Parolele nu se potrivesc')
    .required('Parola de confirmare este obligatorie'),
});