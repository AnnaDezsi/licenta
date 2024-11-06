
import { useFormik } from 'formik';
import * as yup from 'yup';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import api from '../services/axiosConfig';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { setAuthProfile } from '../store/auth/action';

const validationSchema = yup.object({
    email: yup.string().email('Te rugam sa introduci o adresa de email valida').required('Adresa de email este obligatorie'),
    password: yup.string().min(6, 'Parola trebuie sa contina minimum 6 caractere').required('Parola este obligatorie'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Parolele nu se potrivesc')
      .required('Parola de confirmare este obligatorie'),
});

export const Signup = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await api.post('/auth/signup', values);
                localStorage.setItem('token', response.data.token);    
                navigate("/")
            } catch (error) {
                console.error(error?.message)
            }
        },
    });

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        label="Adresa de email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        {...formik.getFieldProps('email')}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        label="Parola"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        {...formik.getFieldProps('password')}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <TextField
                        label="Confirma parola"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        {...formik.getFieldProps('confirmPassword')}
                        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    />
                    <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
                        Inregistrare
                    </Button>
                </form>
            </Box>
        </Container>
    );
};
