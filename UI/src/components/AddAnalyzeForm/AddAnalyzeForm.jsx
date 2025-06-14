import { useFormik } from 'formik'
import { Box, Button, Grid2, Typography } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import BackupIcon from '@mui/icons-material/Backup';
import DeleteIcon from '@mui/icons-material/Delete';
import api from '../../services/axiosConfig';
import { useEffect } from 'react';

export const AddAnalyzeForm = () => {

    useEffect(() => {
        api("/analize/categorii").then(res => {
            console.log(res.data);
        })
    })

    //   const analyzesForm = useFormik({
    //         initialValues: {
    //             medicalAnalyzes: "",
    //             file: null
    //         },
    //         onSubmit: async (values) => {
    //             try {
    //                 const formData = new FormData();
    //                 formData.append("file", values.file);
    //                 formData.append("medicalAnalyzes", values.medicalAnalyzes)
    //             } catch (error) {
    //                 console.log(error);
    
    //             }
    //         }
    //     })

    //         const { getRootProps, getInputProps } = useDropzone({
    //     accept: {
    //         "application/pdf": [".pdf"]
    //     },
    //     onDrop: (acceptedFiles) => {
    //         analyzesForm.setFieldValue("file", acceptedFiles[0]);
    //     },
    // });

    // const handleAnalyzeChange = (e) => {
    //     analyzesForm.setFieldValue("medicalAnalyzes", e.target.value)
    // }

    // const handleDeleteFile = (e) => {
    //     analyzesForm.setFieldValue("file", null)
    // }
    return (
        <></>
        // <form onSubmit={analyzesForm.handleSubmit}>
        //     <Grid2 container spacing={2}>
        //         <Grid2 size={6}>
        //             <textarea onChange={handleAnalyzeChange} style={{
        //                 height: 200,
        //                 width: '100%',
        //                 fontSize: '1.2em',
        //                 border: "2px solid #00B4D8",
        //                 backgroundColor: "#fffffc9",
        //                 borderRadius: '5px'
        //             }} placeholder='Leucocite 20ul/l' />

        //         </Grid2>
        //         <Grid2 size={6}>
        //             {analyzesForm.values.file ? <Box sx={{
        //                 height: 200,
        //                 display: 'flex',
        //                 alignItems: 'center',
        //                 justifyContent: 'center',
        //                 border: (theme) => `2px dashed ${theme.palette.primary.main}`,
        //                 padding: "20px",
        //                 textAlign: "center",
        //                 columnGap: '2em',
        //                 position: 'relative'
        //             }}><Typography variant='body1' fontWeight={500}>{analyzesForm.values.file.name}</Typography>
        //                 <Button variant="text" size='large' color="error" onClick={handleDeleteFile} startIcon={<DeleteIcon />}>
        //                     Sterge fisierul
        //                 </Button>
        //             </Box> :
        //                 <Box
        //                     {...getRootProps()}
        //                     sx={{
        //                         height: 200,
        //                         display: 'flex',
        //                         alignItems: 'center',
        //                         justifyContent: 'center',
        //                         border: (theme) => `2px dashed ${theme.palette.primary.main}`,
        //                         padding: "20px",
        //                         cursor: "pointer",
        //                         textAlign: "center",
        //                         borderRadius: '5px',
        //                         position: 'relative'
        //                     }}
        //                 >
        //                     <Box sx={{
        //                         top: '50%',
        //                         left: '50%',
        //                         position: 'absolute',
        //                         transform: 'translate(-50%, -50%)',
        //                     }}>
        //                         <BackupIcon sx={{ fontSize: '200px', width: 200, height: 200, color: '#90909050' }} />
        //                     </Box>
        //                     <input {...getInputProps()} id="file" name="file" type="file" />

        //                     <Typography>(Optional) Pentru o acuratete mai buna a viitoarelor analize,
        //                         <br /> te rugam sa adaugi si ultimele analize medicale in format PDF.</Typography>

        //                 </Box>
        //             }
        //         </Grid2>
        //         <Grid2 size={12}>
        //             <Box sx={{
        //                 display: 'flex',
        //                 justifyContent: 'center'
        //             }}>

        //                 <Button type="submit" sx={{ width: 400, display: "block", marign: '0 auto' }} variant="contained" size="large">Incarca analizele</Button>
        //             </Box>
        //         </Grid2>
        //     </Grid2>
        // </form>
    )
}