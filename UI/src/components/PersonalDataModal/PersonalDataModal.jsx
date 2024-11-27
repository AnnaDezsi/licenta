import { Button, InputAdornment, Modal, Paper, TextField, Typography } from '@mui/material'
import { useFormik } from 'formik'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import HomeIcon from '@mui/icons-material/Home';
import api from '../../services/axiosConfig';
import { useDispatch } from 'react-redux';
import { setAuthPersonalData } from '../../store/auth/action';

export const PersonalDataModal = ({ isOpen = false, setModalOpen }) => {
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            cnp: "",
            firstName: "",
            lastName: "",
            address: "",
            phoneNumber: "",
        },
        onSubmit: async (values) => {
            try {
                api.post('/personal', values).then(response => {
                    dispatch(setAuthPersonalData(response.data.data))
                    setModalOpen(false)
                })
            } catch (error) {
                console.error(error?.message)
            }
        },
    })
    return (
        <Modal open={isOpen}>
            <Paper sx={{
                maxWidth: 800,
                width: 'auto',
                margin: "0 auto",
                position: 'relative',
                top: '50%',
                transform: 'translateY(-50%)',
                padding: '1em'
            }}>
                <Typography variant='h6' align='center' sx={{ marginBottom: "1em" }}>Pentru a finaliza procesul de creare a contului, te rugam sa introduci informatiile urmatoare.</Typography>
                <form onSubmit={formik.handleSubmit}>
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
                    <Button type='submit' fullWidth size='large' variant='contained' color='primary' sx={{ marginTop: 2 }}>Incarca datele</Button>
                </form>
            </Paper>
        </Modal>
    )
}
