import { FieldArray, Formik, FormikProvider, useFormik } from 'formik'
import { Box, Button, Grid2, IconButton, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import api from '../../services/axiosConfig';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAnalyzes } from '../../store/journal/selectors';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { PrimarySelector } from '../PrimarySelector/PrimarySelector';
import { convertManyToLabelAndValue } from '../../utilities/convertors';
import { useMemo } from 'react';
import { setAnalyzeCategories } from '../../store/journal/action';
import { useCallback } from 'react';
import ClearIcon from '@mui/icons-material/Clear';


const steps = [
    'Date initiale',
    'Institutia si doctorul',
    'Diagnostic',
    'Adauga fisiere',
    'Finalizare'
];

dayjs.extend(utc);
dayjs.extend(timezone);

export const AddAnalyzeForm = () => {
    const dispatch = useDispatch();
    const { categoriiMedicale } = useSelector(getAnalyzes);
    const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);



    const analyzesForm = useFormik({
        initialValues: {
            testingDate: null,
            analyzeTitle: "",
            institution: "",
            doctor: "",
            categories: [],
            file: null,
            notes: ""
        },

        onSubmit: async (values) => {
            try {
                console.log(values);
                // Prepare form data for submission
                const formData = new FormData();
                formData.append("testingDate", values.testingDate);
                formData.append("analyzeTitle", values.analyzeTitle);
                formData.append("institution", values.institution);
                formData.append("doctor", values.doctor);
                formData.append("notes", values.notes);
                formData.append("categories", JSON.stringify(values.categories));
                formData.append("file", values.file);
                // Submit the form data to the server


            } catch (error) {
                console.error("Error submitting analyze form:", error);
            }
            // Prepare form data for submission


        }
    })

    const initiateFirstCategory = useCallback((categoryWithOneParameter) => {
        const parameters = [{
            name: categoryWithOneParameter?.parameters[0]?.name || "",
            value: categoryWithOneParameter?.parameters[0]?.min_val || 0
        }]

        analyzesForm.setFieldValue("categories", [
            {
                name: categoryWithOneParameter.name,
                parameters
            }
        ]);
    }, [categoriiMedicale])

    useEffect(() => {
        setIsCategoriesLoading(true);
        api("/analize/categorii")
            .then(res => {

                dispatch(setAnalyzeCategories(res.data));

                const categoryWithOneParameter = res.data.find(cat => cat?.parameters?.length > 0);

                if (!!categoryWithOneParameter) {
                    initiateFirstCategory(categoryWithOneParameter);
                }


            })
            .catch(err => {
                console.error("Error fetching medical categories:", err);
            })
            .finally(() => {
                setIsCategoriesLoading(false);
            });
    }, [])

    // const addNewCategory = (category) => {
    //     // Check if the category already exists in the form
    //     const existingCategory = analyzesForm.values.categories.find(cat => cat.id === category.id);
    //     if (!existingCategory) {
    //         analyzesForm.setFieldValue("categories", [...analyzesForm.values.categories, category]);
    //     }
    // }

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

    const handleNextStep = () => {
        setCurrentStep((prev) => prev + 1)
    }

    const handlePrevStep = () => {
        setCurrentStep((prev) => prev - 1)
    }

    const categoriesAsOptions = useMemo(() => {
        return convertManyToLabelAndValue(categoriiMedicale, "name");
    }, [categoriiMedicale]);

    const changeAnalyzeCategory = (newValue, actionMeta, categoryIndex) => {
        if (actionMeta.action !== 'select-option') return
        analyzesForm.setFieldValue(`categories[${categoryIndex}].name`, newValue.value)
        const parameters = categoriiMedicale.find(cat => cat.name === newValue.value)?.parameters || [];

        const newParameters = parameters.length > 0 ? [{
            name: parameters[0]?.name || "",
            value: parameters[0]?.min_val || 0,
        }] : []

        analyzesForm.setFieldValue(`categories[${categoryIndex}].parameters`, newParameters)
    }

    const changeAnalyzeParameter = (newValue, actionMeta, index, paramIndex) => {
        if (actionMeta.action !== 'select-option') return
        analyzesForm.setFieldValue(`categories[${index}].parameters[${paramIndex}].name`, newValue.value)
    }


    const remainingParametersForCategoryIndex = (categoryName) => {
        const allPossibleParameters = categoriiMedicale.find(cat => cat.name === categoryName)?.parameters || [];
        const alreadySelectedParameters = analyzesForm.values.categories.find(cat => cat.name === categoryName)?.parameters || [];
        return allPossibleParameters.filter(param => !alreadySelectedParameters.some(p => p.name === param.name));
    }

    const handleAddCategory = () => {

        const addedCategories = analyzesForm.values.categories.map(cat => cat.name);
        const remainingCategories = categoriiMedicale.filter(cat => !addedCategories.includes(cat.name));

        console.log("Remaining categories:", remainingCategories);
        if (remainingCategories.length > 0) {

            analyzesForm.setFieldValue("categories", [
                ...analyzesForm.values.categories,
                {
                    name: remainingCategories[0].name,
                    parameters: !!remainingCategories[0].parameters.length ? [{
                        name: remainingCategories[0].parameters[0]?.name || "",
                        value: remainingCategories[0].parameters[0]?.min_val || 0,
                    }] : []
                }
            ]);

        }
    }

    const handleDeleteCategory = (categoryName) => {
        const updatedCategories = analyzesForm.values.categories.filter(cat => cat.name !== categoryName);
        if (updatedCategories.length >= 1) {
            analyzesForm.setFieldValue("categories", updatedCategories);
        }
    }

    const handleAddParameterToCategory = (categoryName) => {
        const remainingParameters = remainingParametersForCategoryIndex(categoryName);

        if (remainingParameters.length > 0) {
            const parameters = {
                name: remainingParameters[0].name,
                value: remainingParameters[0].min_val || 0,
            }
            const categoryIndex = analyzesForm.values.categories.findIndex(cat => cat.name === categoryName);
            analyzesForm.setFieldValue(`categories[${categoryIndex}].parameters`, [
                ...analyzesForm.values.categories[categoryIndex].parameters,
                parameters
            ]);
        }
    }


    const handleDeleteParameter = (categoryName, paramName) => {
        const categoryIndex = analyzesForm.values.categories.findIndex(cat => cat.name === categoryName);
        const updatedParameters = analyzesForm.values.categories[categoryIndex].parameters.filter(param => param.name !== paramName);
        if (updatedParameters.length >= 1) {
            analyzesForm.setFieldValue(`categories[${categoryIndex}].parameters`, updatedParameters);
        }
    }

    console.log(analyzesForm.values);


    return (
        <form onSubmit={analyzesForm.handleSubmit}>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Stepper activeStep={currentStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
            <Box sx={{ maxWidth: 800, margin: '0 auto' }}>
                {currentStep === 0 &&
                    <Grid2 container spacing={2}>
                        <Grid2 size={12}>
                            <TextField
                                fullWidth
                                {...analyzesForm.getFieldProps("analyzeTitle")}
                                label="Titlul analizei"
                                variant="outlined"
                            />
                        </Grid2>
                        <Grid2 size={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Data analizei"
                                    timezone="Europe/Bucharest"
                                    onChange={(value) => analyzesForm.setFieldValue("testingDate", value, true)}
                                    value={analyzesForm.values.testingDate}
                                    // slotProps={{
                                    //     textField: {
                                    //         error: Boolean(medicalJournalForm.touched.startDate && medicalJournalForm.errors.startDate),
                                    //         helperText: medicalJournalForm.touched.startDate && medicalJournalForm.errors.startDate,
                                    //     },
                                    // }}
                                    sx={{ width: 1 }}
                                />
                            </LocalizationProvider>
                        </Grid2>
                    </Grid2>
                }
                {currentStep === 1 &&
                    <Grid2 container spacing={2}>
                        <Grid2 size={12}>
                            <TextField
                                fullWidth
                                {...analyzesForm.getFieldProps("institution")}
                                label="Institutia medicala"
                                variant="outlined"
                            />
                        </Grid2>
                        <Grid2 size={12}>
                            <TextField
                                fullWidth
                                {...analyzesForm.getFieldProps("doctor")}
                                label="Numele doctorului"
                                variant="outlined"
                            />
                        </Grid2>
                    </Grid2>
                }
                {currentStep === 2 &&
                    <Grid2 container spacing={2}>
                        <FormikProvider value={analyzesForm}>
                            <FieldArray name="categories" render={(arrayHelpers) => {

                                return analyzesForm.values.categories.map((category, index) => (
                                    <Grid2 key={`category-${category.name}`} size={12} sx={{
                                        border: "1px solid rgba(0, 0, 0, 0.16)",
                                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                                        p: 2,
                                        borderRadius: 2,
                                        m: 0
                                    }}>
                                        <Grid2 container direction="column" spacing={2}>
                                            <Grid2 size={12}>
                                                <Grid2 container alignItems="center" justifyContent="space-between">
                                                    <Grid2 size="grow">
                                                        <PrimarySelector
                                                            options={categoriesAsOptions}
                                                            value={categoriesAsOptions.find(cat => cat.value === category.name)}
                                                            onChange={(newValue, actionMeta) => changeAnalyzeCategory(newValue, actionMeta, index)}
                                                            label="Selecteaza o categorie medicala"
                                                            key={index}
                                                        />
                                                    </Grid2>
                                                    <Grid2 size="auto">
                                                        <IconButton disabled={analyzesForm.values.categories.length <= 1} color="error" onClick={() => handleDeleteCategory(category.name)}>
                                                            <ClearIcon />
                                                        </IconButton>
                                                    </Grid2>
                                                </Grid2>

                                            </Grid2>
                                            <Grid2 size={12}>
                                                {category?.parameters.map((parameter, paramIndex) => {
                                                    const allPossibleParameters = categoriiMedicale.find(cat => cat.name === category.name)?.parameters || [];
                                                    
                                                    const alreadySelectedParameters = analyzesForm.values.categories.find(cat => cat.name === category.name)?.parameters || [];

                                                    const remainingParameters = allPossibleParameters.filter(param => !alreadySelectedParameters.some(p => p.name === param.name));
                                            

                                                    const possibleOptions = convertManyToLabelAndValue(allPossibleParameters, "name") || [];
                                                    const parameterOptions = convertManyToLabelAndValue(remainingParameters, "name") || []

                                                    const { min_val, max_val, unit } = allPossibleParameters.find(param => param.name === parameter.name) || { min_val: 0, max_val: 0, unit: "N/A" };
                                                    return (
                                                        <Grid2 key={`category-${category.name}-parameter-${parameter.name}`} container alignItems="center" columnGap={2} justifyContent="space-between" sx={{ mb: paramIndex === category.parameters.length - 1 ? 0 : 1 }}>
                                                            <Grid2 size={5}>
                                                                <PrimarySelector
                                                                    options={parameterOptions}
                                                                    value={possibleOptions.find(param => param.value === parameter.name)}
                                                                    onChange={(newValue, actionMeta) => changeAnalyzeParameter(newValue, actionMeta, index, paramIndex)}
                                                                    label="Selecteaza o categorie medicala"
                                                                    key={paramIndex}
                                                                />
                                                            </Grid2>
                                                            <Grid2 size="grow">
                                                                <Typography variant='body2' textAlign="right">
                                                                    Min: {min_val} - Max: {max_val}
                                                                </Typography>
                                                            </Grid2>
                                                            <Grid2 size={2}>
                                                                <TextField
                                                                    fullWidth
                                                                    type="number"
                                                                    {...analyzesForm.getFieldProps(`categories[${index}].parameters[${paramIndex}].value`)}
                                                                    label="Valoare"
                                                                    variant="outlined"
                                                                />
                                                            </Grid2>

                                                            <Grid2 size={1}>
                                                                <Typography variant='body2'>
                                                                    {unit}
                                                                </Typography>
                                                            </Grid2>

                                                            <Grid2 size="auto">
                                                                <IconButton disabled={allPossibleParameters.length -1  === remainingParameters.length} color="error" onClick={() => handleDeleteParameter(category.name, parameter.name)}>
                                                                    <ClearIcon />
                                                                </IconButton>
                                                            </Grid2>

                                                        </Grid2>
                                                    )
                                                })}
                                            </Grid2>
                                            {remainingParametersForCategoryIndex(category.name).length > 0 &&
                                                <Grid2 size="grow">
                                                    <Button sx={{ m: 0, p: 0 }} onClick={() => handleAddParameterToCategory(category.name)}>Adauga parametru</Button>
                                                </Grid2>
                                            }

                                        </Grid2>
                                    </Grid2>
                                ))
                            }

                            } />
                        </FormikProvider>
                        <Grid2 size={12}>
                            <Button variant="outlined" onClick={handleAddCategory}>
                                Adauga o noua categorie
                            </Button>
                        </Grid2>
                    </Grid2>
                }
                <Grid2 direction="row" alignItems="center" justifyContent="center" container sx={{ mt: 2 }} columnGap={2}>
                    <Button variant="contained" color='primary' onClick={handlePrevStep}>Inapoi</Button>
                    <Button variant="contained" color='primary' onClick={handleNextStep}>Inainte</Button>
                </Grid2>
            </Box>
        </form>

    )
}





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