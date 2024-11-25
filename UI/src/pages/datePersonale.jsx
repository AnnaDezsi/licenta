import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
    Card,
    CardContent,
    CardActions,
    TextField,
    Button,
    Typography,
    InputAdornment,
    Avatar,
    IconButton,
    Stack,
    Box,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { IstoricMedical } from '../components/IstoricMedical/IstoricMedical.jsx';

// Validation schema using Yup
const validationSchema = yup.object({
    name: yup.string().required('Numele este obligatoriu'),
    cnp: yup
        .string()
        .length(13, 'CNP trebuie sa aiba exact 13 cifre')
        .matches(/^\d+$/, 'CNP trebuie sa contina doar cifre')
        .required('CNP-ul este obligatoriu'),
    email: yup.string().email('Adresa de email este invalida').required('Email-ul este obligatoriu'),
    phone: yup
        .string()
        .matches(/^(\+4|04)?(07\d{8})$/, 'Numar de telefon invalid')
        .required('Telefonul este obligatoriu'),
    sex: yup.string().required('Sexul este obligatoriu'),
    age: yup
        .number()
        .required('Varsta este obligatorie')
        .min(1, 'Varsta trebuie sa fie mai mare de 0')
        .integer('Varsta trebuie sa fie un numar intreg'),
});

export const DatePersonale = () => {
    const [profilePhoto, setProfilePhoto] = useState(null);

    const formik = useFormik({
        initialValues: {
            name: '',
            cnp: '',
            email: '',
            phone: '',
            sex: '',
            age: '',
        },
        validationSchema,
        onSubmit: (values) => {
            console.log('Form values:', { ...values, profilePhoto });
            alert('Form submitted successfully!');
        },
    });

    const handlePhotoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfilePhoto(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePhotoDelete = () => {
        setProfilePhoto(null);
    };

    return (
        <div>
            <Card
                sx={{
                    maxWidth: 500,
                    margin: '20px auto',
                    padding: 2,
                    boxShadow: 3,
                    borderRadius: 3,
                }}
            >
                <CardContent>
                    <Typography variant="h5" gutterBottom align="center">
                        Date Personale
                    </Typography>

                    {/* Profile Photo Section */}
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                        <Avatar
                            alt="Profile Photo"
                            src={profilePhoto}
                            sx={{ width: 100, height: 100 }}
                        />
                        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', ml: 2 }}>
                            <IconButton color="primary" component="label">
                                <PhotoCamera />
                                <input
                                    type="file"
                                    accept="image/*"
                                    hidden
                                    onChange={handlePhotoUpload}
                                />
                            </IconButton>
                            {profilePhoto && (
                                <IconButton color="secondary" onClick={handlePhotoDelete}>
                                    <DeleteIcon />
                                </IconButton>
                            )}
                        </Stack>
                    </div>

                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            label="Nume"
                            fullWidth
                            margin="normal"
                            {...formik.getFieldProps('name')}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircleOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            label="CNP"
                            fullWidth
                            margin="normal"
                            {...formik.getFieldProps('cnp')}
                            error={formik.touched.cnp && Boolean(formik.errors.cnp)}
                            helperText={formik.touched.cnp && formik.errors.cnp}
                        />
                        <TextField
                            label="Email"
                            fullWidth
                            margin="normal"
                            {...formik.getFieldProps('email')}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AlternateEmailOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            label="Telefon"
                            fullWidth
                            margin="normal"
                            {...formik.getFieldProps('phone')}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PhoneOutlinedIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            label="Sex"
                            fullWidth
                            margin="normal"
                            {...formik.getFieldProps('sex')}
                            error={formik.touched.sex && Boolean(formik.errors.sex)}
                            helperText={formik.touched.sex && formik.errors.sex}
                        />
                        <TextField
                            label="Varsta"
                            type="number"
                            fullWidth
                            margin="normal"
                            {...formik.getFieldProps('age')}
                            error={formik.touched.age && Boolean(formik.errors.age)}
                            helperText={formik.touched.age && formik.errors.age}
                        />
                        <CardActions>
                            <Button
                                type="submit"
                                fullWidth
                                size="large"
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2 }}
                            >
                                Salvează
                            </Button>
                        </CardActions>
                    </form>
                </CardContent>
            </Card>

            {/* Render IstoricMedical */}
            <IstoricMedical />

            {/* Footer */}
            <Box
                component="footer"
                sx={{
                    textAlign: 'center',
                    py: 2,
                    mt: 3,
                    backgroundColor: '#f5f5f5',
                    borderTop: '1px solid #ddd',
                }}
            >
                <Typography variant="body2" color="black">
                    &copy; 2024 Inteligent Medical Solution. All rights reserved.
                </Typography>
            </Box>
        </div>
    );
};
