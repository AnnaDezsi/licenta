import React, { useEffect, useMemo, useState } from 'react'
import { PageContainer } from '../components/PageContainer/PageContainer'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { useFormik } from 'formik'
import { Box, Button, Divider, Grid2, List, ListItem, Paper, TextField, Typography } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import BackupIcon from '@mui/icons-material/Backup';
import DeleteIcon from '@mui/icons-material/Delete';
import BiotechIcon from '@mui/icons-material/Biotech';
import MedicationIcon from '@mui/icons-material/Medication';
import CloseIcon from '@mui/icons-material/Close';
import { SecondaryPanel } from '../components/SecondaryPanel/SecondaryPanel'
import { AddMedicineForm } from '../components/AddMedicineForm/AddMedicineForm'
import { v4 as uuidv4 } from 'uuid';
import api from '../services/axiosConfig'

const mockupPastAnalyzes = [
    {
        createdAt: new Date(),
        updatedAt: new Date(),
        status: "ACTIV",
        data: {
            file: 'Analize Regina Maria 2024 Ianuarie.pdf',
            medicalAnalyzes: 'Valori hemoglobina - 200ug/l, valori lorem ipsum , sigfsajkn, dsjkan ,dsakmkmkm  dasiddas dasdasda,'
        }
    },
    {
        createdAt: new Date(),
        updatedAt: new Date(),
        status: "RETRO",
        data: {
            file: 'Analize Regina Maria 2023 Aprilie.pdf',
            medicalAnalyzes: 'Valori leucocitate marite - 200ug/l'
        }
    },
    {
        createdAt: new Date(),
        updatedAt: new Date(),
        status: "RETRO",
        data: {
            file: 'Analize Regina Maria 2023 Aprilie.pdf',
            medicalAnalyzes: 'Valori leucocitate marite - 200ug/l'
        }
    },
    {
        createdAt: new Date(),
        updatedAt: new Date(),
        status: "RETRO",
        data: {
            file: 'Analize Regina Maria 2023 Aprilie.pdf',
            medicalAnalyzes: 'Valori leucocitate marite - 200ug/l'
        }
    }
]





export const JurnalMedical = () => {
    const [uploadNewAnalyzes, setUploadNewAnalyzes] = useState(false)
    const [uploadMedicalJournal, setMedicalJournal] = useState(false)

    const [medicamentatii, setMedicamentatii] = useState([])
    const [isLoadingMedicamentatii, setLoadingMedicamentatii] = useState(false);

    const analyzesForm = useFormik({
        initialValues: {
            medicalAnalyzes: "",
            file: null
        },
        onSubmit: async (values) => {
            try {
                console.log(values);

                const formData = new FormData();
                formData.append("file", values.file);
                formData.append("medicalAnalyzes", values.medicalAnalyzes)
                console.log(formData);

            } catch (error) {
                console.log(error);

            } finally {
                // setUploadNewAnalyzes(false)
            }
        }
    })


    useEffect(() => {
        api("/medicamentatie").then(res => setMedicamentatii(res.data.data)).catch(e => console.error(e)).finally(_ => setLoadingMedicamentatii(false))
    }, [])


console.log(medicamentatii);


    const { getRootProps, getInputProps } = useDropzone({
        accept: ".pdf",
        onDrop: (acceptedFiles) => {
            analyzesForm.setFieldValue("file", acceptedFiles[0]);
        },
    });

    const handleAnalyzeChange = (e) => {
        analyzesForm.setFieldValue("medicalAnalyzes", e.target.value)
    }

    const handleDeleteFile = (e) => {
        analyzesForm.setFieldValue("file", null)
    }

    const handleOpenAnalyzeOrJournal = (type) => {
        if (type === 'ANALYZE') {
            setUploadNewAnalyzes(true)
            setMedicalJournal(false)
        }
        if (type === 'JOURNAL') {
            setMedicalJournal(true)
            setUploadNewAnalyzes(false)
        }
    }

    return (
        <>
            <Box sx={{ width: 1, backgroundColor: theme => `${theme.palette.primary.main}20`, padding: '2em 0' }}>
                <PageContainer>
                    <Grid2 container alignItems="center" spacing={2}>
                        <Grid2 size="grow">
                            <PageHeader pageName="Jurnal Medical" caption="Revizuie datele istoricului tau medical" />
                        </Grid2>
                        <Grid2 size="auto">
                            <Button sx={{
                                padding: 0, backgroundColor: theme => theme.palette.primary.main,
                                color: 'white',
                                padding: '1.3em 2em',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                columnGap: '1em'
                            }} onClick={() => handleOpenAnalyzeOrJournal('ANALYZE')}>
                                <BiotechIcon sx={{ fontSize: '34px' }} />
                                <Typography variant='h6' fontWeight={400}>
                                    Incarca analize noi
                                </Typography>
                            </Button>


                        </Grid2>
                        <Grid2 size="auto">
                            <Button sx={{
                                padding: 0, backgroundColor: theme => theme.palette.primary.main,
                                color: 'white',
                                padding: '1.3em 2.0em',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                columnGap: '1em'
                            }} onClick={() => handleOpenAnalyzeOrJournal('JOURNAL')}>
                                <MedicationIcon sx={{ fontSize: '34px' }} />
                                <Typography variant='h6' fontWeight={400}>
                                    Incarca medicamentatie
                                </Typography>
                            </Button>
                        </Grid2>
                    </Grid2>
                </PageContainer>
            </Box>


            <PageContainer paddingVertical={2}>
                {uploadNewAnalyzes &&
                    <SecondaryPanel sx={{ mb: 4 }}>
                        <Grid2 container >
                            <Grid2 size={12}>
                                <Grid2 container alignItems="center" display="flex" sx={{ mb: 2 }}>
                                    <Grid2 size="grow">
                                        <Typography>
                                            Incarca analizele - Te rog sa introduci detalii despre ultimele analize
                                        </Typography>
                                    </Grid2>
                                    <Grid2 size="auto">
                                        <Button variant="text" size='large' color="secondary" onClick={() => setUploadNewAnalyzes(false)} endIcon={<CloseIcon />}>
                                            Inchide
                                        </Button>
                                    </Grid2>
                                </Grid2>
                            </Grid2>
                            <Grid2 size={12}>
                                <form onSubmit={analyzesForm.handleSubmit}>
                                    <Grid2 container spacing={2}>
                                        <Grid2 size={6}>
                                            <textarea onChange={handleAnalyzeChange} style={{
                                                height: 200,
                                                width: '100%',
                                                fontSize: '1.2em',
                                                border: "2px solid #00B4D8",
                                                backgroundColor: "#fffffc9",
                                                borderRadius: '5px'
                                            }} placeholder='Leucocite 20ul/l' />

                                        </Grid2>
                                        <Grid2 size={6}>
                                            {analyzesForm.values.file ? <Box sx={{
                                                height: 200,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                border: (theme) => `2px dashed ${theme.palette.primary.main}`,
                                                padding: "20px",
                                                textAlign: "center",
                                                columnGap: '2em',
                                                position: 'relative'
                                            }}><Typography variant='body1' fontWeight={500}>{analyzesForm.values.file.name}</Typography>
                                                <Button variant="text" size='large' color="error" onClick={handleDeleteFile} startIcon={<DeleteIcon />}>
                                                    Sterge fisierul
                                                </Button>
                                            </Box> :
                                                <Box
                                                    {...getRootProps()}
                                                    sx={{
                                                        height: 200,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        border: (theme) => `2px dashed ${theme.palette.primary.main}`,
                                                        padding: "20px",
                                                        cursor: "pointer",
                                                        textAlign: "center",
                                                        borderRadius: '5px',
                                                        position: 'relative'
                                                    }}
                                                >
                                                    <Box sx={{
                                                        top: '50%',
                                                        left: '50%',
                                                        position: 'absolute',
                                                        transform: 'translate(-50%, -50%)',
                                                    }}>
                                                        <BackupIcon sx={{ fontSize: '200px', width: 200, height: 200, color: '#90909050' }} />
                                                    </Box>
                                                    <input {...getInputProps()} id="file" name="file" type="file" />

                                                    <Typography>(Optional) Pentru o acuratete mai buna a viitoarelor analize,
                                                        <br /> te rugam sa adaugi si ultimele analize medicale in format PDF.</Typography>

                                                </Box>
                                            }
                                        </Grid2>
                                        <Grid2 size={12}>
                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'center'
                                            }}>

                                                <Button type="submit" sx={{ width: 400, display: "block", marign: '0 auto' }} variant="contained" size="large">Incarca analizele</Button>
                                            </Box>
                                        </Grid2>
                                    </Grid2>
                                </form>
                            </Grid2>
                        </Grid2>
                    </SecondaryPanel>}
                {uploadMedicalJournal &&
                    <SecondaryPanel sx={{ mb: 4 }}>
                        <Grid2 container>
                            <Grid2 size={12}>
                                <Grid2 container alignItems="center" display="flex" sx={{ mb: 2 }}>
                                    <Grid2 size="grow">
                                        <Typography>
                                            Adauga medicamentatia consumata in perioada unui tratament
                                        </Typography>
                                    </Grid2>
                                    <Grid2 size="auto">
                                        <Button variant="text" size='large' color="secondary" onClick={() => setMedicalJournal(false)} endIcon={<CloseIcon />}>
                                            Inchide
                                        </Button>
                                    </Grid2>
                                </Grid2>
                            </Grid2>
                            <Grid2 size={12}>
                                <AddMedicineForm />
                            </Grid2>
                        </Grid2>
                    </SecondaryPanel>}
                <Grid2 container spacing={2}>
                    <Grid2 size={4}>
                        <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#fff' }}>
                            <Typography variant='h6' fontWeight={600}>Analizele mele</Typography>
                            <List sx={{
                                height: 320,
                                overflowY: 'scroll',
                            }}>

                                {mockupPastAnalyzes.map((pastAnalyzes, index) => (
                                    <ListItem key={uuidv4()} sx={{
                                        border: theme => `1px solid ${theme.palette.primary.main}`, borderRadius: '5px',
                                        backgroundColor: theme => `${theme.palette.primary.main}10`,
                                        marginBottom: index === pastAnalyzes.length - 1 ? 0 : '.4em',
                                        transition: '.1s',
                                        '&:hover': {
                                            backgroundColor: theme => `${theme.palette.primary.main}20`,
                                            transition: '.1s',
                                        }
                                    }}>
                                        <Box sx={{ width: 1 }}>
                                            <Grid2 container>
                                                <Grid2 size={12}>
                                                    <Typography sx={{ my: 1 }}>#{pastAnalyzes.updatedAt.toDateString()}</Typography>
                                                    <Divider />
                                                    <Typography sx={{ my: 1 }}>{pastAnalyzes.data.medicalAnalyzes}</Typography>
                                                </Grid2>

                                            </Grid2></Box>
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Grid2>
                    <Grid2 size={4}>
                        <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#fff' }}>
                            <Typography variant='h6' fontWeight={600}>Medicamentatie activa</Typography>
                            <List sx={{
                                height: 320,
                            }}>
                                
                                <Box sx={{
                                    width: 1,
                                    height: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Typography>Nu exista tratament activ</Typography>
                                </Box>

                            </List>
                        </Paper>
                    </Grid2>
                    <Grid2 size={4}>
                        <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#fff' }}>
                            <Typography variant='h6' fontWeight={600}>Medicamentatii anterioare</Typography>
                            <List sx={{
                                height: 320,
                            }}>
                                <Box sx={{
                                    width: 1,
                                    height: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Typography>Nu exista tratamente in trecut</Typography>
                                </Box>

                            </List>
                        </Paper>
                    </Grid2>
                </Grid2>
            </PageContainer>
        </>

    )
}
