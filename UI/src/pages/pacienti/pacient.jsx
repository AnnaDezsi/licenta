import { useMatches } from "react-router-dom";
import api from "../../services/axiosConfig"
import React, { useEffect, useMemo, useState } from "react";
import { Box, Button, Collapse, Divider, Grid2, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { PageContainer } from "../../components/PageContainer/PageContainer";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { displayBirthDate, displayGender } from "../datePersonale";
import { DateUtils } from "../../utilities/DateUtils";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

export const Pacient = () => {
  const match = useMatches(['/pacienti', '/pacienti/:clientId']);
  const clientId = match[match.length - 1].params.clientId;

  const [name, setName] = useState("")
  const [pacientPersonalData, setPacientPersonalData] = useState({
    cnp: "",
    phoneNumber: "",
    address: ""
  })
  const [analize, setAnalize] = useState([])
  const [medicamentatie, setMedicamentatie] = useState([])

  useEffect(() => {
    if (!clientId) return;
    api('/personal/clients/' + clientId).then(res => {
      try {
        const { data } = res;
        setName(data?.personalData?.firstName + " " + data?.personalData?.lastName || "")
        setPacientPersonalData({
          cnp: data?.personalData?.cnp || "",
          phoneNumber: data?.personalData?.phoneNumber || "",
          address: data?.personalData?.address || "",
          details: data?.personalData?.details || null
        })
        setMedicamentatie(data?.medicamentatie)
        setAnalize(data?.analize)
      } catch (e) {
        console.error("Eroare setare pacienti")
      }
    })
  }, [clientId])


  return (
    <>
      <Box sx={{ width: 1, backgroundColor: theme => `${theme.palette.primary.main}20`, padding: '2em 0', mb: 4 }}>
        <PageContainer>
          <Grid2 container alignItems="center" spacing={2}>
            <Grid2 size="grow">
              <PageHeader pageName={name} />
            </Grid2>
          </Grid2>
        </PageContainer>

      </Box>
      <PageContainer>
        <Grid2 container spacing={2}>
          <Grid2 size={6}>
            <PacientPersonalData personalData={pacientPersonalData} />
          </Grid2>
          <Grid2 size="grow">
            <PacientPersonalDataDetails personalData={pacientPersonalData} />
          </Grid2>
          <Grid2 size={12}>
            <Medicamentatie medicamentatie={medicamentatie} />
          </Grid2>
          <Grid2 size={12}>
            <Analize analize={analize} />
          </Grid2>
        </Grid2>
      </PageContainer>
    </>
  )
}

const Analize = ({ analize }) => {
  const [currentAnalyze, setCurrentAnalyze] = useState(0);

  const analyzeData = analize[currentAnalyze]

  const setNext = () => {
    if (currentAnalyze === analize.length - 1) return;
    setCurrentAnalyze(prev => prev + 1)
  }

  const setPrev = () => {
    if (currentAnalyze === 0) return;
    setCurrentAnalyze(prev => prev - 1);
  }

  return (
    <Paper sx={{ background: "#fff", p: 2 }}>
      <Grid2 container direction="column" rowGap={1}>
        <Grid2 size={12}>
          <Typography>Analize</Typography>
        </Grid2>
        <Grid2 size={12}>
          <Divider />
        </Grid2>
        <Grid2 size={12}>
          <Grid2 container alignItems="center">
            <Grid2 size={8}><Typography variant="h4">{analyzeData?.analyzeTitle || ""}</Typography></Grid2>
            <Grid2 size={4}>
              <Grid2 container justifyContent="flex-end" columnGap={2}>

                <IconButton disabled={currentAnalyze === 0} onClick={setPrev} color="primary">
                  <ArrowBackIosNewIcon />
                </IconButton>


                <IconButton disabled={currentAnalyze === analize.length - 1} onClick={setNext} color="primary">
                  <ArrowForwardIosIcon />
                </IconButton>
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>
        <Grid2 size={12}>
          <Grid2 container spacing={4}>
            <Grid2 size={6}>
              <Grid2 size={12}>
                <Typography>Detalii</Typography>
              </Grid2>
              <Grid2 size={6} sx={{ mb: 1 }}>
                <Divider />
              </Grid2>
              <Grid2 size={12}>
                <Typography variant="body2">Data testarii: {DateUtils.formatDate(analyzeData?.testingDate)}</Typography>
              </Grid2>
              <Grid2 size={12}>
                <Typography variant="body2">Data inregistrare analiza: {DateUtils.formatDate(analyzeData?.createdAt)}</Typography>
              </Grid2>
              <Grid2 size={12}>
                <Typography variant="body2">Institutia de recoltare: {analyzeData?.institution || ""}</Typography>
              </Grid2>
              <Grid2 size={12}>
                <Typography variant="body2">Nume doctor: {analyzeData?.doctor || ""}</Typography>
              </Grid2>
            </Grid2>
            <Grid2 size={6}>
              <Grid2 size={12} sx={{ mb: 1 }}>
                <Typography>Valori</Typography>
              </Grid2>
              <Grid2 size={12}>
                {analyzeData?.categories.map((category, index) => {
                  const results = analyzeData?.results.filter(res => res?.parameter?.medicalCategoryId === category.categoryId)
                  return (
                    <Box key={category.id} sx={{
                      backgroundColor: theme => `${theme.palette.primary.main}30`,
                      p: 1,
                      borderRadius: '5px',
                      mb: index === analyzeData?.categories.length - 1 ? 0 : 1
                    }}>
                      <Typography sx={{ mb: 1 }}>{category?.category?.name || "Categoria " + index}</Typography>
                      <Grid2 container sx={{ pl: 3 }} spacing={1}>
                        {
                          results?.map(result => <Grid2 size={12}>
                            <Grid2 container>
                              <Grid2 size={6}>
                                <Typography variant="body2">{result.parameter.name}</Typography>
                              </Grid2>

                              <Grid2 size={6}>
                                <Typography variant="body2">{result?.value || 0} {result?.parameter?.unit || "N/A"}</Typography>
                              </Grid2>
                            </Grid2>
                          </Grid2>)
                        }

                      </Grid2>
                    </Box>
                  )
                })}
              </Grid2>
            </Grid2>
            <Grid2 size={6}>
              <Grid2 size={12}>
                <Typography>Completarile pacientului</Typography>
              </Grid2>
              <Grid2 size={6} sx={{ mb: 1 }}>
                <Divider />
              </Grid2>
              <Grid2 size={12}>
                {analyzeData?.note ? <Typography variant="body2">{analyzeData?.note}</Typography> : <Typography variant="body2">Nu exista completari scrise</Typography>}
              </Grid2>
              <Grid2 size={6} sx={{ mt: 1 }}>
                {analyzeData?.file ?
                  <Button onClick={() => console.log("descarcare pdf")} variant="outlined" startIcon={<CloudDownloadIcon />}> Descarca fisierul PDF</Button>
                  :
                  <Typography variant="body2">Nu exista fisier atasat</Typography>}
              </Grid2>
            </Grid2>
            <Grid2 size={12}>
              <Divider />
            </Grid2>
            <Grid2 size={12}>
              <Typography variant="h6">Analiza doctorului</Typography>
            </Grid2>

            <Grid2 size={6}>
              <Button variant="contained">Incepe analiza AI</Button>
            </Grid2>
            <Grid2 size={6}>
              <Typography>Adauga comentariu asupra analizelor</Typography>
              <textarea style={{ maxWidth: '100%', width: '100%', minHeight: '200px' }} />
            </Grid2>

            <Grid2 size={12}>
              <Box sx={{ display: 'flex', justifyContent: "center", width: '100%' }}>
                <Button size="large" sx={{ width: '30%' }} variant="contained">Trimite analize</Button>
              </Box>
            </Grid2>
          </Grid2>
        </Grid2>
      </Grid2>
    </Paper>
  )
}

const Medicamentatie = ({ medicamentatie }) => {
  const [openRows, setOpenRows] = useState({});

  const toggleRow = (id) => {
    setOpenRows(prev => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <Paper sx={{ background: "#fff", p: 2 }}>
      <Grid2 container direction="column" rowGap={1}>
        <Grid2 size={12}>
          <Typography>Medicamentatii</Typography>
        </Grid2>
        <Grid2 size={12}>
          <Divider />
        </Grid2>
        <Grid2 size={12}>
          <TableContainer sx={{ maxHeight: 430, overflow: 'auto' }}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Nume</TableCell>
                  <TableCell>Activ</TableCell>
                  <TableCell >Data incepere</TableCell>
                  <TableCell >Data sfarsit</TableCell>
                  <TableCell align="right">Medicamente</TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ overflow: "scroll" }}>
                {medicamentatie.sort((a, b) => new Date(a.startDate) - new Date(b.startDate)).map((row) => (
                  <React.Fragment>
                    <TableRow
                      key={row.name}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 }

                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>{(new Date(row.startDate) <= new Date() && new Date() <= new Date(row.endDate)) ? "Da" : "Nu"}</TableCell>
                      <TableCell >{DateUtils.formatDate(row.startDate)}</TableCell>
                      <TableCell >{DateUtils.formatDate(row.endDate)}</TableCell>
                      <TableCell align="right">({row?.medicamenteLinks.length}) <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => toggleRow(row.id)}
                      >
                        {openRows[row.id] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                      </IconButton></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={openRows[row.id]} timeout="auto" unmountOnExit>
                          <Box sx={{ margin: 1 }}>
                            <Table size="small" aria-label="purchases">
                              <TableHead>
                                <TableRow>
                                  <TableCell align="right">Nume medicament</TableCell>
                                  <TableCell align="right">Cantitate</TableCell>
                                  <TableCell align="right">Descriere</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {row?.medicamenteLinks.map(med => <TableRow>
                                  <TableCell align="right" component="th" scope="row">
                                    {med.medicament.name}
                                  </TableCell>
                                  <TableCell align="right">{med.quantity}</TableCell>
                                  <TableCell align="right">{med.medicament.description}</TableCell>
                                </TableRow>)}

                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid2>
      </Grid2>
    </Paper>

  )
}

const PacientPersonalData = ({ personalData }) => {
  const [isCnpShown, setCnpShown] = useState(false);

  return (
    <Paper sx={{ background: "#fff", p: 2 }}>
      <Grid2 container direction="column" rowGap={1}>
        <Grid2 size={12}>
          <Typography>Date personale</Typography>
        </Grid2>
        <Grid2 size={12}>
          <Divider />
        </Grid2>
        <Grid2 size={12}>
          <Box>
            <Grid2 container>
              <Grid2 size={12}>
                <Grid2 container alignItems="center">
                  <Grid2 size={{
                    xs: 12,
                    md: 6
                  }}>
                    <Typography>CNP:</Typography>
                  </Grid2>
                  <Grid2 size={{
                    xs: 12,
                    md: "auto"
                  }}>
                    {personalData?.cnp && <Box display="flex" alignItems="center" gap={1}>
                      <IconButton
                        aria-label="display cnp"
                        size="small"
                        color="primary"
                        onClick={() => setCnpShown(!isCnpShown)}
                      >
                        {isCnpShown ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
                      </IconButton>
                      <Typography sx={{ fontWeight: 600 }}>
                        {isCnpShown ? personalData?.cnp : "*".repeat(10) + personalData?.cnp.slice(11, 13)}
                      </Typography>
                    </Box>}
                  </Grid2>
                </Grid2>
              </Grid2>

              <Grid2 size={12}>
                <Grid2 container><Grid2 size={{
                  xs: 12,
                  md: 6
                }}>
                  <Typography>Varsta:</Typography>
                </Grid2>
                  <Grid2 size={{
                    xs: 12,
                    md: "auto"
                  }}>
                    <Typography sx={{ fontWeight: 600 }}>{displayBirthDate(personalData?.cnp)}</Typography>
                  </Grid2>
                </Grid2>
              </Grid2>

              <Grid2 size={12}>
                <Grid2 container><Grid2 size={{
                  xs: 12,
                  md: 6
                }}>
                  <Typography>Sex:</Typography>
                </Grid2>
                  <Grid2 size={{
                    xs: 12,
                    md: "auto"
                  }}>
                    <Typography sx={{ fontWeight: 600 }}>{displayGender(personalData?.cnp)}</Typography>
                  </Grid2>
                </Grid2>
              </Grid2>


              <Grid2 size={12}>
                <Grid2 container><Grid2 size={{
                  xs: 12,
                  md: 6
                }}>
                  <Typography>Numar de telefon:</Typography>
                </Grid2>
                  <Grid2 size={{
                    xs: 12,
                    md: "auto"
                  }}>
                    <Typography sx={{ fontWeight: 600 }}>{personalData?.phoneNumber || ""}</Typography>
                  </Grid2>
                </Grid2>
              </Grid2>

              <Grid2 size={12}>
                <Grid2 container><Grid2 size={{
                  xs: 12,
                  md: 6
                }}>
                  <Typography>Adresa:</Typography>
                </Grid2>
                  <Grid2 size={{
                    xs: 12,
                    md: "auto"
                  }}>
                    <Typography sx={{ fontWeight: 600 }}>{personalData?.address || ""}</Typography>
                  </Grid2>
                </Grid2>
              </Grid2>

            </Grid2>
          </Box>
        </Grid2>


      </Grid2>
    </Paper>
  )
}
const PacientPersonalDataDetails = ({ personalData }) => {

  return (
    <Paper sx={{ background: "#fff", p: 2 }}>
      <Grid2 container direction="column" rowGap={1}>
        <Grid2 size={12}>
          <Typography>Detalii </Typography>
        </Grid2>
        <Grid2 size={12}>
          <Divider />
        </Grid2>
        <Grid2 size={12}>
          <Box>
            <Grid2 container>
              <Grid2 size={12}>
                <Grid2 container><Grid2 size={{
                  xs: 12,
                  md: 6
                }}>
                  <Typography>Fumator:</Typography>
                </Grid2>
                  <Grid2 size={{
                    xs: 12,
                    md: "auto"
                  }}>
                    <Typography sx={{ fontWeight: 600 }}>{personalData?.details?.fumator ? "Da" : "Nu"}</Typography>
                  </Grid2>
                </Grid2>
              </Grid2>
              {displayGender(personalData?.cnp) === "F" && <><Grid2 size={12}>
                <Grid2 container><Grid2 size={{
                  xs: 12,
                  md: 6
                }}>
                  <Typography>Sarcina activa:</Typography>
                </Grid2>
                  <Grid2 size={{
                    xs: 12,
                    md: "auto"
                  }}>
                    <Typography sx={{ fontWeight: 600 }}>{personalData?.details?.sarcinaActiva ? "Da" : "Nu"}</Typography>
                  </Grid2>
                </Grid2>
              </Grid2>
              <Grid2 size={12}>
                <Grid2 container><Grid2 size={{
                  xs: 12,
                  md: 6
                }}>
                  <Typography>Numar de sarcini</Typography>
                </Grid2>
                  <Grid2 size={{
                    xs: 12,
                    md: "auto"
                  }}>
                    <Typography sx={{ fontWeight: 600 }}>{personalData?.details?.nrSarciniAnterioare}</Typography>
                  </Grid2>
                </Grid2>
              </Grid2></>}
              
              <Grid2 size={12}>
                <Grid2 container><Grid2 size={{
                  xs: 12,
                  md: 6
                }}>
                  <Typography>Diabet</Typography>
                </Grid2>
                  <Grid2 size={{
                    xs: 12,
                    md: "auto"
                  }}>
                    <Typography sx={{ fontWeight: 600 }}>{personalData?.details?.diabet ? "Da" : "Nu"}</Typography>
                  </Grid2>
                </Grid2>
              </Grid2>

            </Grid2>
          </Box>
        </Grid2>


      </Grid2>
    </Paper>
  )
}
