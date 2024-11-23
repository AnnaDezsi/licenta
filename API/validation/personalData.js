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
    .required("Vă rugăm să introduceți numele")
    .required("Vă rugăm să introduceți data nașterii"),
  phoneNumber: yup
    .string()
    .required("Vă rugăm să introduceți numărul de telefon"),
});
