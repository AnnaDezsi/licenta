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

const displayBirthDate = (cnp) => {
  try {
    const day = generatePersonalDetailsFromCNP(cnp).birthDate.getDay();
    const month = generatePersonalDetailsFromCNP(cnp).birthDate.getMonth();
    const year = generatePersonalDetailsFromCNP(cnp).birthDate.getFullYear();

    const age = new Date().getFullYear() - year;
    const months = ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"]
    return `${day} ${months[month - 1]} ${year} (${age})`

  } catch (e) {
    return ""
  }
}

const displayGender = (cnp) => {
  try {
    return generatePersonalDetailsFromCNP(cnp).gender;
  } catch (e) {
    return ""
  }
}



export const DatePersonale = () => {
  const [isEditingOpen, setEditingOpen] = useState(false);


 

  const handleEditData = () => {
    setEditingOpen(!isEditingOpen)
  }


  return (
    <PageContainer paddingVertical={2}>
      <PageHeader pageName="Date personale" caption="Revizuie datele tale personale" />
      <Button onClick={handleEditData}>{isEditingOpen ? "Inapoi" : "Editeaza datele"}</Button>
      {isEditingOpen ?  <PersonalDataForm /> : <DisplayPersonalData />
      }
    </PageContainer>
  )

}

const DisplayPersonalData = () => {
  const datePersonale = useSelector(personalDataSelector);
  const [isCnpShown, setCnpShown] = useState(false);

  return (
    <Box>
      <Grid2 container>
        <Grid2 size={{ xs: 12, md: 4, lg: 3 }}>
          <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#fff' }}>
            <Box sx={{ mb: 2 }}>
              <Grid2 container>
                <Grid2 size={6}>
                  <Typography>Prenume:</Typography>
                </Grid2>
                <Grid2 size={6}>
                  <Typography sx={{ fontWeight: 600 }}>{datePersonale?.firstName || ""}</Typography>
                </Grid2>
              </Grid2>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Grid2 container>
                <Grid2 size={6}>
                  <Typography>Nume:</Typography>
                </Grid2>
                <Grid2 size={6}>
                  <Typography sx={{ fontWeight: 600 }}>{datePersonale?.lastName || ""}</Typography>
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
                    <Grid2><Typography sx={{ fontWeight: 600 }}>{isCnpShown ? datePersonale?.cnp : "*".repeat(10) + datePersonale?.cnp.slice(11, 13)}</Typography></Grid2>

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
                  <Typography sx={{ fontWeight: 600 }}>{displayBirthDate(datePersonale?.cnp)}</Typography>
                </Grid2>
              </Grid2>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Grid2 container>
                <Grid2 size={6}>
                  <Typography>Sex:</Typography>
                </Grid2>
                <Grid2 size={6}>
                  <Typography sx={{ fontWeight: 600 }}>{displayGender(datePersonale?.cnp)}</Typography>
                </Grid2>
              </Grid2>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Grid2 container>
                <Grid2 size={6}>
                  <Typography>Numar de telefon:</Typography>
                </Grid2>
                <Grid2 size={6}>
                  <Typography sx={{ fontWeight: 600 }}>{datePersonale?.phoneNumber || ""}</Typography>
                </Grid2>
              </Grid2>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Grid2 container>
                <Grid2 size={6}>
                  <Typography>Adresa:</Typography>
                </Grid2>
                <Grid2 size={6}>
                  <Typography sx={{ fontWeight: 600 }}>{datePersonale?.address || ""}</Typography>
                </Grid2>
              </Grid2>
            </Box>
          </Paper>
        </Grid2>
      </Grid2>
    </Box>
  )
}
