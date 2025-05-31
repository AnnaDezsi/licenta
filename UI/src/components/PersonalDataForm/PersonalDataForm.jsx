import { useFormik } from "formik"
import { Button, InputAdornment, List, ListItem, ListItemText, TextField, Typography } from "@mui/material"
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import HomeIcon from '@mui/icons-material/Home';
import { useMemo, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { PageContainer } from "../PageContainer/PageContainer";
import { ConfirmationModal } from "../ConfirmationModal/ConfirmationModal";
import { PageHeader } from "../PageHeader/PageHeader";
import * as Yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { personalDataSelector } from "../../store/auth/selectors";
import api from "../../services/axiosConfig";
import { setAuthPersonalData } from "../../store/auth/action";

const validationSchema = Yup.object({
  cnp: Yup.string()
    .length(13, 'CNP-ul trebuie să fie exact 13 caractere')
    .matches(/^\d{13}$/, 'CNP-ul trebuie să conțină doar cifre')
    .required('CNP-ul este obligatoriu'),
  firstName: Yup.string()
    .min(2, 'Prenumele trebuie să aibă cel puțin 2 caractere')
    .required('Prenumele este obligatoriu'),
  lastName: Yup.string()
    .min(2, 'Numele trebuie să aibă cel puțin 2 caractere')
    .required('Numele este obligatoriu'),
  address: Yup.string()
    .min(6, 'Adresa trebuie să aibă cel puțin 6 caractere')
    .required('Adresa este obligatorie'),
  phoneNumber: Yup.string()
    .min(10, 'Numărul de telefon trebuie să aibă cel puțin 10 caractere')
    .required('Numărul de telefon este obligatoriu')
});

const mappedFormValueToRomanian = {
  cnp: 'Cod Numeric Personal',
  firstName: 'Prenume',
  lastName: 'Nume de familie',
  address: 'Adresa',
  phoneNumber: 'Numar de telefon'
}

const modifiedFields = (initialData = {}, modifiedData = {}, whichFields = []) => {

  const result = {};
  if (!initialData && !modifiedData) return result
  Object.keys(initialData).forEach((key) => {
    if (whichFields.includes(key) && initialData[key] !== modifiedData[key]) {
      result[key] = `${initialData[key]} -> ${modifiedData[key]}`;
    }
  });

  return result;
};



export const PersonalDataForm = () => {
  const datePersonale = useSelector(personalDataSelector);
  const [isConfirming, setConfirming] = useState(false)

  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    try {
      await api.put('/personal', values);
      dispatch(setAuthPersonalData(values));
      return "success";
    } catch (e) {
      throw new Error(e.message);
    }
  };


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      cnp: datePersonale?.cnp || "",
      firstName: datePersonale?.firstName || "",
      lastName: datePersonale?.lastName || "",
      address: datePersonale?.address || "",
      phoneNumber: datePersonale?.phoneNumber || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await handleSubmit(values)
      } catch (error) {
        formik.setValues({
          cnp: datePersonale?.cnp || "",
          firstName: datePersonale?.firstName || "",
          lastName: datePersonale?.lastName || "",
          address: datePersonale?.address || "",
          phoneNumber: datePersonale?.phoneNumber || "",
        })
        console.error(error?.message)
      }
      finally { setConfirming(false) }
    },
  })

  const memoizedChangedFields = useMemo(() => {
    if (!datePersonale) return {};
    return modifiedFields(datePersonale, formik.values, ["cnp", "firstName", "lastName", "address", "phoneNumber"])
  }, [formik.values, datePersonale]);

  const handleClose = () => {
    formik.setValues({
      cnp: datePersonale?.cnp || "",
      firstName: datePersonale?.firstName || "",
      lastName: datePersonale?.lastName || "",
      address: datePersonale?.address || "",
      phoneNumber: datePersonale?.phoneNumber || "",
    })
    setConfirming(false)
  }

  const isSubmitDisabled = memoizedChangedFields ? Object.keys(formik.errors).length !== 0 || !Object.keys(memoizedChangedFields).length : true
  return (
    <>

      <ConfirmationModal title="Doriti sa modificati urmatoarele date cu caracter personal?" isOpen={isConfirming} handleClose={handleClose} handleConfirm={formik.submitForm} >
        <List>
          {memoizedChangedFields && Object.keys(memoizedChangedFields).map(changedItemKey => {
            return (<ListItem key={uuidv4()}>
              <ListItemText
                primary={`${mappedFormValueToRomanian[changedItemKey]}: ${memoizedChangedFields[changedItemKey]}`}
              />
            </ListItem>)
          })}
        </List>
      </ConfirmationModal>



      <form>
        <TextField
          label="Nume de familie"
          variant="outlined"
          placeholder='Nume de familie'
          fullWidth
          margin="normal"
          {...formik.getFieldProps('lastName')}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        /> <TextField
          label="Prenume"
          variant="outlined"
          placeholder='Prenume'
          fullWidth
          margin="normal"
          {...formik.getFieldProps('firstName')}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        /> <TextField
          label="CNP"
          variant="outlined"
          placeholder='Cod Numeric Personal'
          fullWidth
          margin="normal"
          {...formik.getFieldProps('cnp')}
          error={formik.touched.cnp && Boolean(formik.errors.cnp)}
          helperText={formik.touched.cnp && formik.errors.cnp}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <FingerprintIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          label="Numar de telefon"
          placeholder='0770100100'
          type="text"
          variant="outlined"
          fullWidth
          margin="normal"
          {...formik.getFieldProps('phoneNumber')}
          error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
          helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <LocalPhoneIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          label="Adresa"
          placeholder='Str. Lucian Blaga, nr. 4, Mun. Baia Mare, Judet Maramures'
          type="text"
          variant="outlined"
          fullWidth
          margin="normal"
          {...formik.getFieldProps('address')}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <HomeIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        <Button type="button" onClick={() => setConfirming(true)} disabled={isSubmitDisabled} fullWidth size='large' variant='contained' color='primary' sx={{ marginTop: 2 }}>Modifica datele</Button>
      </form>
    </>
  )
}
