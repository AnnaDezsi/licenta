import React, { useState } from 'react';
import { 
    Card, 
    CardContent, 
    CardActions, 
    TextField, 
    Button, 
    Typography, 
    Grid, 
    IconButton, 
    Stack, 
    Box 
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

// Utility component for uploading files
const FileUploadField = ({ label, onFileChange }) => (
    <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 2 }}>
        <Button
            variant="outlined"
            startIcon={<UploadFileOutlinedIcon />}
            component="label"
        >
            {label}
            <input type="file" hidden onChange={onFileChange} />
        </Button>
    </Stack>
);

export const IstoricMedical = () => {
    const [analysisFile, setAnalysisFile] = useState(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setAnalysisFile(file ? file.name : null);
    };

    const handleFileDelete = () => {
        setAnalysisFile(null);
    };

    return (
        <Card
            sx={{
                maxWidth: 600,
                margin: '20px auto',
                padding: 2,
                boxShadow: 3,
                borderRadius: 3,
            }}
        >
            <CardContent>
                <Typography variant="h5" gutterBottom align="center">
                    Istoric Medical
                </Typography>

                {/* Form Fields */}
                <Grid container spacing={2}>
                    {/* Ultima externare */}
                    <Grid item xs={12}>
                        <TextField
                            label="Ultima data a externarii"
                            type="date"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>

                    {/* Analize Upload Section */}
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Încarcă analize:</Typography>
                        <FileUploadField
                            label={analysisFile || 'Selectează un fișier'}
                            onFileChange={handleFileUpload}
                        />
                        {analysisFile && (
                            <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    startIcon={<DeleteOutlineOutlinedIcon />}
                                    onClick={handleFileDelete}
                                >
                                    Șterge
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<EditOutlinedIcon />}
                                >
                                    Editează
                                </Button>
                            </Stack>
                        )}
                    </Grid>

                    {/* Tratament actual */}
                    <Grid item xs={12}>
                        <TextField
                            label="Tratament actual"
                            multiline
                            rows={4}
                            fullWidth
                        />
                    </Grid>

                    {/* Istoric boli */}
                    <Grid item xs={12}>
                        <TextField
                            label="Istoric boli"
                            multiline
                            rows={4}
                            fullWidth
                        />
                    </Grid>

                    {/* Analize trecut */}
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Analize trecut:</Typography>
                        <FileUploadField
                            label="Încarcă fișier analize"
                            onFileChange={handleFileUpload}
                        />
                    </Grid>

                    {/* Calendar analize */}
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="info"
                            startIcon={<CalendarMonthOutlinedIcon />}
                        >
                            Calendar Analize
                        </Button>
                    </Grid>

                    {/* Feedback anterior */}
                    <Grid item xs={12}>
                        <TextField
                            label="Feedback anterior"
                            multiline
                            rows={4}
                            fullWidth
                        />
                    </Grid>

                    {/* Predictie anterioara */}
                    <Grid item xs={12}>
                        <TextField
                            label="Predicție anterioară"
                            multiline
                            rows={4}
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </CardContent>

            <CardActions>
                <Button
                    type="submit"
                    fullWidth
                    size="large"
                    variant="contained"
                    color="primary"
                >
                    Salvează
                </Button>
            </CardActions>
        </Card>
    );
};
