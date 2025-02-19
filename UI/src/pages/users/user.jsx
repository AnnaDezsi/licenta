import { useFormik } from "formik"
import { PageContainer } from "../../components/PageContainer/PageContainer"
import { personalDataSelector } from "../../store/auth/selectors"
import { useDispatch, useSelector } from "react-redux"
import { Button, InputAdornment, List, ListItem, ListItemText, TextField, Typography } from "@mui/material"
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import HomeIcon from '@mui/icons-material/Home';
import { useEffect, useMemo, useState } from "react"
import { ConfirmationModal } from "../../components/ConfirmationModal/ConfirmationModal"
import api from "../../services/axiosConfig"
import { setAuthPersonalData } from "../../store/auth/action"
import { v4 as uuidv4 } from 'uuid';
import { PageHeader } from "../../components/PageHeader/PageHeader"
import { useMatches } from "react-router-dom"
import { PersonalDataForm } from "../../components/PersonalDataForm/PersonalDataForm"

const mappedFormValueToRomanian = {
  cnp: 'Cod Numeric Personal',
  firstName: 'Prenume',
  lastName: 'Nume de familie',
  address: 'Adresa',
  phoneNumber: 'Numar de telefon'
}



export const User = () => {
  const route = useMatches(['/utilizatori/:userId']);
  const userId = route[route.length - 1]?.params?.userId;
  const [userData, setUserData] = useState(null)
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    try {
      await api.put('/personal/user/' + userId, values)
      setUserData(values)      
      return "success"; 
    } catch (e) {
      throw new Error(e.message);
    }
  };



useEffect(() => {
  if (!userId) return;

  api(`/personal/user/${userId}`)
    .then(res => {
      const { cnp, firstName, lastName, address, phoneNumber } = res.data.data
      setUserData({
        cnp, firstName, lastName, address, phoneNumber
      })
    })

}
  , [userId])

if (!userData) return;

return <PersonalDataForm datePersonale={userData} handleSubmit={handleSubmit} />

}
