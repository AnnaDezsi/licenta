import { useEffect, useState } from 'react'
import { PageContainer } from '../components/PageContainer/PageContainer'
import { PageHeader } from '../components/PageHeader/PageHeader'
import { Box, Button, Divider, Grid2, List, ListItem, Paper, TextField, Typography } from '@mui/material'
import BiotechIcon from '@mui/icons-material/Biotech';
import MedicationIcon from '@mui/icons-material/Medication';
import CloseIcon from '@mui/icons-material/Close';
import { SecondaryPanel } from '../components/SecondaryPanel/SecondaryPanel'
import { AddMedicineForm } from '../components/AddMedicineForm/AddMedicineForm'
import { v4 as uuidv4 } from 'uuid';
import api from '../services/axiosConfig';
import { DateUtils } from '../utilities/DateUtils'
import { AddAnalyzeForm } from '../components/AddAnalyzeForm/AddAnalyzeForm'
import { useDispatch, useSelector } from 'react-redux';
import { getAnalyzes, getMedicamentation } from '../store/journal/selectors';
import { resetJournal, setInitialAnalyzes, setInitialMeds } from '../store/journal/action';
import { personalDataSelector } from '../store/auth/selectors';

export const JurnalMedical = () => {
    const [uploadNewAnalyzes, setUploadNewAnalyzes] = useState(false)
    const [uploadMedicalJournal, setMedicalJournal] = useState(false)

    const dispatch = useDispatch();


    const { activeMeds, retroMeds } = useSelector(getMedicamentation);
    const { submitted } = useSelector(getAnalyzes);

    const userId = useSelector(personalDataSelector)?.userId


    useEffect(() => {
        api("/medicamentatie/" + userId)
            .then(res => {
                const medicamentatii = res.data.data;
                const isValid = Array.isArray(medicamentatii) && medicamentatii?.every(el => el.startDate && el.endDate)

                if (!isValid) {
                    throw new Error("Error data type")
                }
                dispatch(setInitialMeds(medicamentatii))
            })
            .catch(e => console.error(e))
    }, [])

    useEffect(() => {
        if (!userId) return;
        api("/analize/" + userId)
            .then(res => {
                dispatch(setInitialAnalyzes(res.data))
            })
    }, [userId])


    useEffect(() => {
        return () => dispatch(resetJournal())
    }, [])



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
                                backgroundColor: theme => theme.palette.primary.main,
                                color: 'white',
                                padding: '.8em 1.4em',
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
                                backgroundColor: theme => theme.palette.primary.main,
                                color: 'white',
                                padding: '.8em 1.4em',
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
                                <AddAnalyzeForm />
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
                    <Grid2 size={{
                        xs: 12,
                        xl: 4
                    }}>
                        <AnalyzeBoard submitted={submitted} title="Analizele mele" />
                    </Grid2>
                    <Grid2 size={{
                        xs: 12,
                        xl: 4
                    }}>
                        <MedicBoard medicamentatie={activeMeds} title="Medicamentatie activa" />
                    </Grid2>
                    <Grid2 size={{
                        xs: 12,
                        xl: 4
                    }}>
                        <MedicBoard medicamentatie={retroMeds} title="Medicamentatie anterioara" />

                    </Grid2>

                </Grid2>
            </PageContainer>
        </>

    )
}

const AnalyzeBoard = ({ submitted, title }) => {
    return (
        <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#fff' }}>
            <Typography variant='h6' fontWeight={600}>{title}</Typography>
            <List sx={{
                height: 320,
                overflowY: 'scroll',
            }}>

                {submitted.length ? submitted.map((analyze, index) => (
                    <ListItem key={uuidv4()} sx={{
                        border: theme => `1px solid ${theme.palette.primary.main}`, borderRadius: '5px',
                        backgroundColor: theme => `${theme.palette.primary.main}10`,
                        marginBottom: index === submitted.length - 1 ? 0 : '.4em',
                        transition: '.1s',
                        '&:hover': {
                            backgroundColor: theme => `${theme.palette.primary.main}20`,
                            transition: '.1s',
                        }
                    }}>
                        <Box sx={{ width: 1 }}>
                            <Grid2 container>
                                <Grid2 size={12}>
                                    <Grid2 container alignItems="center" direction="row" justifyContent="space-between">
                                        <Grid2 size="grow">
                                            <Typography sx={{ my: 1 }}>{analyze.analyzeTitle}</Typography>
                                        </Grid2>
                                        <Grid2 size="auto">
                                            <Box sx={{
                                                border: theme => `1px solid ${theme.palette.primary.main}70`,
                                                borderRadius: '5px',
                                                px: '0.4em',
                                            }}>
                                                <Typography variant='body2'>{analyze.checkedBy || "Nepreluat"}</Typography>
                                            </Box>
                                        </Grid2>
                                    </Grid2>
                                </Grid2>

                                <Grid2 size={12}>
                                    <Divider />
                                </Grid2>
                                <Grid2 size={12}>
                                    <Typography variant='body2' sx={{ my: 1 }}>Efectuare analize: {DateUtils.formatDate(analyze.testingDate)}</Typography>
                                </Grid2>
                                <Grid2 size={12}>
                                    <Typography variant='body2' sx={{ my: 1 }}>Centru medical: {analyze.institution}</Typography>
                                </Grid2>
                                <Grid2 size={12}>
                                    <Typography variant='caption' sx={{ my: 1 }}>Creat: {DateUtils.formatDate(analyze.createdAt)}</Typography>
                                </Grid2>
                            </Grid2>
                        </Box>
                    </ListItem>
                )) : <Box sx={{
                    width: 1,
                    height: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>

                    <Typography>Nu exista analize active</Typography>
                </Box>}
            </List>
        </Paper>
    )
}

const MedicBoard = ({ medicamentatie, title }) => {
    return (
        <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#fff' }}>
            <Typography variant='h6' fontWeight={600}>{title}</Typography>
            <List sx={{
                height: 320,
                overflowY: 'scroll',
            }}>
                {medicamentatie.length ?
                    medicamentatie.map((med, index) => (
                        <ListItem key={uuidv4()} sx={{
                            border: theme => `1px solid ${theme.palette.primary.main}`, borderRadius: '5px',
                            backgroundColor: theme => `${theme.palette.primary.main}10`,
                            marginBottom: index === medicamentatie.length - 1 ? 0 : '.4em',
                            transition: '.1s',
                            '&:hover': {
                                backgroundColor: theme => `${theme.palette.primary.main}20`,
                                transition: '.1s',
                            }
                        }}>
                            <Box sx={{ width: 1 }}>
                                <Grid2 container>
                                    <Grid2 size={12}>
                                        <Typography sx={{ my: 1 }}>{med.name}</Typography>

                                        <Divider />
                                        <Grid2 container alignItems="center">
                                            <Grid2 size="grow">
                                                <Typography sx={{ my: 1 }}>{DateUtils.formatDate(med.startDate)} - {DateUtils.formatDate(med.endDate)}</Typography>
                                            </Grid2>
                                            {new Date(med.startDate) > new Date() && <Grid2>
                                                <Typography variant='body2' sx={{ border: theme => `1px solid #00000030`, borderRadius: '5px', padding: '0 .2em' }}>Neinceput</Typography>
                                            </Grid2>}
                                        </Grid2>
                                        <Typography sx={{ fontWeight: 700 }}>Medicamentatie</Typography>
                                        {med?.medicines.map(medicine =>
                                            <Typography key={uuidv4()}>{medicine.quantity} x {medicine.name}</Typography>
                                        )}
                                    </Grid2>

                                </Grid2></Box>
                        </ListItem>
                    ))
                    : <Box sx={{
                        width: 1,
                        height: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>

                        <Typography>Nu exista tratament activ</Typography>
                    </Box>
                }


            </List>
        </Paper >
    )
}
