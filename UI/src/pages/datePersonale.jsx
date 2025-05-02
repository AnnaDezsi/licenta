import { personalDataSelector } from "../store/auth/selectors"
import { useDispatch, useSelector } from "react-redux"
import { PersonalDataForm } from "../components/PersonalDataForm/PersonalDataForm"
import { setAuthPersonalData } from "../store/auth/action"
import api from "../services/axiosConfig"
import { useState } from "react"
import { PageContainer } from "../components/PageContainer/PageContainer"
import { PageHeader } from "../components/PageHeader/PageHeader"
import { Box, Button, Grid2, IconButton, Paper, Typography } from "@mui/material"
import { generatePersonalDetailsFromCNP } from "../utilities/generators"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export const DatePersonale = () => {
  const [isEditingOpen, setEditingOpen] = useState(false);
  const [isCnpShown, setCnpShown] = useState(false);

  const personalData = useSelector(personalDataSelector);

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

  const handleEditData = () => {
    setEditingOpen(!isEditingOpen)
  }




  const displayBirthDate = () => {
    try {
      const day = generatePersonalDetailsFromCNP(personalData.cnp).birthDate.getDay();
      const month = generatePersonalDetailsFromCNP(personalData.cnp).birthDate.getMonth();
      const year = generatePersonalDetailsFromCNP(personalData.cnp).birthDate.getFullYear();

      const age = new Date().getFullYear() - year;
      const months = ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"]
      return `${day} ${months[month - 1]} ${year} (${age})`

    } catch (e) {
      return ""
    }
  }

  const displayGender = () => {
    try {
      return generatePersonalDetailsFromCNP(personalData.cnp).gender;
    } catch (e) {
      return ""
    }
  }

  const displayCnp = () => {
    if (personalData?.cnp) {
      return isCnpShown ? personalData.cnp : "*".repeat(10) + personalData.cnp.slice(11, 13)
    }
    return "";
  }
  // return isEditingOpen && <PersonalDataForm datePersonale={personalData} handleSubmit={handleSubmit}/>

  return (
    <PageContainer paddingVertical={2}>
      <PageHeader pageName="Date personale" caption="Revizuie datele tale personale" />
      <Button onClick={handleEditData}>{isEditingOpen ? "Inapoi" : "Editeaza datele"}</Button>
      {isEditingOpen ? <PersonalDataForm datePersonale={personalData} handleSubmit={handleSubmit} /> : <Box>
        <Grid2 container>
          <Grid2 size={{ xs: 12, md: 4, lg: 3 }}>
            <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#fff' }}>
              <Box sx={{ mb: 2 }}>
                <Grid2 container>
                  <Grid2 size={6}>
                    <Typography>Prenume:</Typography>
                  </Grid2>
                  <Grid2 size={6}>
                    <Typography sx={{ fontWeight: 600 }}>{personalData?.firstName || ""}</Typography>
                  </Grid2>
                </Grid2>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Grid2 container>
                  <Grid2 size={6}>
                    <Typography>Nume:</Typography>
                  </Grid2>
                  <Grid2 size={6}>
                    <Typography sx={{ fontWeight: 600 }}>{personalData?.lastName || ""}</Typography>
                  </Grid2>
                </Grid2>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Grid2 container>
                  <Grid2 size={6}>
                    <Typography>CNP:</Typography>
                  </Grid2>
                  <Grid2 size={6}>
                    <Grid2 container alignItems="center" ><Grid2 size="auto"><IconButton
                      aria-label="expand row"
                      size="small"
                      color="primary"
                      onClick={() => setCnpShown(!isCnpShown)}
                    >
                      {isCnpShown ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                    </IconButton></Grid2>
                      <Grid2><Typography sx={{ fontWeight: 600 }}>{displayCnp()}</Typography></Grid2>

                    </Grid2>
                  </Grid2>
                </Grid2>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Grid2 container>
                  <Grid2 size={6}>
                    <Typography>Varsta:</Typography>
                  </Grid2>
                  <Grid2 size={6}>
                    <Typography sx={{ fontWeight: 600 }}>{displayBirthDate()}</Typography>
                  </Grid2>
                </Grid2>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Grid2 container>
                  <Grid2 size={6}>
                    <Typography>Sex:</Typography>
                  </Grid2>
                  <Grid2 size={6}>
                    <Typography sx={{ fontWeight: 600 }}>{displayGender()}</Typography>
                  </Grid2>
                </Grid2>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Grid2 container>
                  <Grid2 size={6}>
                    <Typography>Numar de telefon:</Typography>
                  </Grid2>
                  <Grid2 size={6}>
                    <Typography sx={{ fontWeight: 600 }}>{personalData?.phoneNumber || ""}</Typography>
                  </Grid2>
                </Grid2>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Grid2 container>
                  <Grid2 size={6}>
                    <Typography>Adresa:</Typography>
                  </Grid2>
                  <Grid2 size={6}>
                    <Typography sx={{ fontWeight: 600 }}>{personalData?.address || ""}</Typography>
                  </Grid2>
                </Grid2>
              </Box>
            </Paper>
          </Grid2>
        </Grid2>
      </Box>}
    </PageContainer>
  )

}
