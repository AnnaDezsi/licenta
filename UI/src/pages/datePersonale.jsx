import { personalDataSelector } from "../store/auth/selectors"
import {  useDispatch, useSelector } from "react-redux"
import { PersonalDataForm } from "../components/PersonalDataForm/PersonalDataForm"
import { setAuthPersonalData } from "../store/auth/action"
import api from "../services/axiosConfig"


export const DatePersonale = () => {

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

  const personalData = useSelector(personalDataSelector)
  return <PersonalDataForm datePersonale={personalData} handleSubmit={handleSubmit}/>
}
