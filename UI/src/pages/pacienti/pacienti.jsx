import { Box, Collapse, Grid2, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { PageContainer } from '../../components/PageContainer/PageContainer'
import { PageHeader } from '../../components/PageHeader/PageHeader'
import api from '../../services/axiosConfig';
import { convertDateToLocalDate } from '../../utilities/convertors';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export const Pacienti = () => {
    const [clients, setClients] = useState([]);
    const [openRows, setOpenRows] = useState({}); // Manage open state for each row

    useEffect(() => {
        api('/personal/clients').then(res => setClients(res.data))
    }, [])

    const toggleRow = (id) => {
        setOpenRows(prev => ({ ...prev, [id]: !prev[id] }));
    }

    return (
        <>
            <Box sx={{ width: 1, backgroundColor: theme => `${theme.palette.primary.main}20`, padding: '2em 0', mb: 4 }}>
                <PageContainer>
                    <Grid2 container alignItems="center" spacing={2}>
                        <Grid2 size="grow">
                            <PageHeader pageName="Pacienti" />
                        </Grid2>
                    </Grid2>
                </PageContainer>
            </Box>
            <PageContainer>
                <Grid2 container spacing={2}>
                    <Grid2 size={12}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell>Nume pacient</TableCell>
                                        <TableCell align="right">Analize</TableCell>
                                        <TableCell align="right">Jurnal activ</TableCell>
                                        <TableCell align="right">Nr. jurnal retroactiv</TableCell>
                                        <TableCell align="right">In asteptare</TableCell>
                                        <TableCell align="right">Actiuni</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {clients.map((client) => (
                                        <React.Fragment key={client.id}>
                                            <TableRow
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell>
                                                    <IconButton
                                                        aria-label="expand row"
                                                        size="small"
                                                        onClick={() => toggleRow(client.id)}
                                                    >
                                                        {openRows[client.id] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {client.personalData.firstName + " " + client.personalData.lastName}
                                                </TableCell>
                                                <TableCell align="right">2</TableCell>
                                                <TableCell align="right">false</TableCell>
                                                <TableCell align="right">3</TableCell>
                                                <TableCell align="right">false</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                                    <Collapse in={openRows[client.id]} timeout="auto" unmountOnExit>
                                                        <Box sx={{ margin: 1 }}>
                                                            <Typography variant="h6" gutterBottom component="div">
                                                                Detalii
                                                            </Typography>
                                                            <Table size="small" aria-label="purchases">
                                                                <TableHead>
                                                                    <TableRow>
                                                                        <TableCell>CNP</TableCell>
                                                                        <TableCell>Adresa</TableCell>
                                                                        <TableCell>Data inscriere</TableCell>
                                                                        <TableCell>Numar de telefon</TableCell>
                                                                    </TableRow>
                                                                </TableHead>
                                                                <TableBody>
                                                                    <TableRow>
                                                                        <TableCell component="th" scope="row">
                                                                            {client.personalData.cnp}
                                                                        </TableCell>
                                                                        <TableCell>{client.personalData.address}</TableCell>
                                                                        <TableCell>{convertDateToLocalDate(client.personalData.createdAt)}</TableCell>
                                                                        <TableCell>{client.personalData.phoneNumber}</TableCell>
                                                                    </TableRow>
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
            </PageContainer>
        </>
    )
}
