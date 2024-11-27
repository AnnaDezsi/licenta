import * as yup from 'yup';



export const personalDataSetupSchema = yup.object().shape({
  cnp: yup
    .string()
    .length(13, "CNP-ul trebuie să fie constituit din 13 cifre")
    .required("Vă rugăm să introduceți un CNP valid"),
  firstName: yup
    .string()
    .min(2, "Prenumele este invalid")
    .required("Vă rugăm să introduceți prenumele"),
  lastName: yup
    .string()
    .min(2, "Numele este invalid")
    .required("Vă rugăm să introduceți numele"),
    address: yup
    .string()
    .min(5, "Adresa trebuie sa contina mai mult de 5 caractere")
    .required("Adresa este obligatorie"),
  phoneNumber: yup
    .string()
    .required("Vă rugăm să introduceți numărul de telefon"),
});
