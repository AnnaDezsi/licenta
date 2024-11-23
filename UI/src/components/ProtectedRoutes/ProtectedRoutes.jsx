import { useEffect, useMemo, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import api from "../../services/axiosConfig";
import { unprotectedRoutes } from "../../services/router";
import { useDispatch, useSelector } from "react-redux";
import { setAuthPersonalData } from "../../store/auth/action";
import { personalDataSelector } from "../../store/auth/selectors";
import { PersonalDataModal } from "../PersonalDataModal/PersonalDataModal";

export const ProtectedRoutes = ({ children }) => {
    const [perm, setPerm] = useState(true);
    const [isPersonalDataModalOpen, setPersonalDataModalOpen] = useState(false)

    const location = useLocation();
    const dispatch = useDispatch();

    const personalDataAlreadySetup = useSelector(personalDataSelector)
    const unprotectedPaths = useMemo(() => unprotectedRoutes.map(route => route.path), [])

    useEffect(() => {
        if (unprotectedPaths.includes(location.pathname)) return;
        let ignore = false;

        const token = localStorage.getItem('token');
        api.get('/auth/verify-session').then(response => {
            if (!ignore && (response.status !== 200 || !token)) {
                setPerm(false)
            }

            return response.data.data
        })
            .then(data => {                
                if((!personalDataAlreadySetup && data)){
                    dispatch(setAuthPersonalData(data))
                }else if(!data){
                    setPersonalDataModalOpen(true)
                }
            })
            .catch(_ => setPerm(false))

        return () => ignore = true
    }, [location])




    return perm ? <>
        <PersonalDataModal isOpen={isPersonalDataModalOpen} setModalOpen={setPersonalDataModalOpen}/>
        {children}
    </> : <Navigate to="/" replace />;
}
