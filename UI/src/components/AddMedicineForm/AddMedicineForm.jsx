import { Box, Button, Grid2, TextField, Typography } from "@mui/material"
import { convertManyToLabelAndValue } from "../../utilities/convertors"
import { createIncrementalArray } from "../../utilities/generators"
import { FieldArray, FormikProvider, useFormik } from "formik"
import Select, { components } from 'react-select'
import DeleteIcon from '@mui/icons-material/Delete';
import * as Yup from 'yup';
import AddIcon from '@mui/icons-material/Add';
import { PrimarySelector } from "../PrimarySelector/PrimarySelector"
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs"

const optionsMedicamente = [
    {
        nume: "Algocalmin"
    },
    {
        nume: "Paracetamol"
    },
]


export const AddMedicineForm = () => {

    const medicalJournalForm = useFormik({
        initialValues: {
            journalName: "",
            startDate: null,
            endDate: null,
            medicines: [
                {
                    medicine: "",
                    quantity: "",
                },
            ],
        },
        validationSchema: Yup.object({
            journalName: Yup.string(),
            medicines: Yup.array().of(
                Yup.object({
                    medicine: Yup.string().required("Selectează un medicament"),
                    quantity: Yup.string().required("Selectează o cantitate"),
                })
            ),
        }),
        onSubmit: async (values) => {
            console.log("Submitted values:", values);
        },
    });



    const medicineOptions = convertManyToLabelAndValue(optionsMedicamente, 'nume')
    const comprimateOptions = convertManyToLabelAndValue(createIncrementalArray(1, 5), 'value')

    const changeMedicineValue = (newValue, actionMeta, index) => {
        if (actionMeta.action !== 'select-option') return
        medicalJournalForm.setFieldValue(`medicines[${index}].medicine`, newValue.value)
    }

    const changeMedicineQuantityValue = (newValue, actionMeta, index) => {
        if (actionMeta.action !== 'select-option') return
        medicalJournalForm.setFieldValue(`medicines[${index}].quantity`, newValue.value)
    }

    const changeMedicineDate = (value, field) => {
        medicalJournalForm.setValues(field, value)
    }


    return (
        <form onSubmit={medicalJournalForm.handleSubmit}>
            <TextField
                label="(Optional) Nume Jurnal"
                variant="standard"
                placeholder="Salvează un nume pentru această intrare în jurnal (Ex.: Dureri de spate)"
                fullWidth
                margin="normal"
                {...medicalJournalForm.getFieldProps("journalName")}
                sx={{ mb: 4 }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid2 container spacing={2}
                    sx={{ mb: 4 }}>
                    <Grid2 size={6}>
                        <DatePicker
                            label="Data incepere tratament"
                            onChange={(value) => medicalJournalForm.setFieldValue("startDate", value, true)}
                            value={medicalJournalForm.values.startDate}
                            sx={{ width: 1 }}
                        />
                    </Grid2>
                    <Grid2 size={6}>
                        <DatePicker
                            label="Data sfarsit tratament"
                            onChange={(value) => medicalJournalForm.setFieldValue("endDate", value, true)}
                            value={medicalJournalForm.values.endDate}
                            sx={{ width: 1 }}
                        />
                    </Grid2>
                </Grid2>

            </LocalizationProvider>
            <FormikProvider value={medicalJournalForm}>
                <FieldArray
                    name="medicines"
                    render={(arrayHelpers) => (
                        <Box>
                            {medicalJournalForm.values.medicines.map((medicine, index) => (
                                <Grid2 container
                                    spacing={2}
                                    key={index}
                                    sx={{
                                        marginBottom: "1rem",
                                    }}
                                >

                                    <Grid2 size={6}>
                                        <PrimarySelector
                                            options={medicineOptions}
                                            value={medicineOptions.find(option => option.value === medicine.medicine)}
                                            placeholder="Selectează medicament"
                                            onChange={(newValue, actionMeta) => changeMedicineValue(newValue, actionMeta, index)}
                                            index={index}
                                            preText="Medicament"
                                            isError={medicalJournalForm.touched.medicines?.[index]?.medicine &&
                                                medicalJournalForm.errors.medicines?.[index]?.medicine}
                                        />

                                        {medicalJournalForm.touched.medicines?.[index]?.medicine &&
                                            medicalJournalForm.errors.medicines?.[index]?.medicine && (
                                                <div style={{ color: "red", fontSize: "0.8rem" }}>
                                                    {medicalJournalForm.errors.medicines[index].medicine}
                                                </div>
                                            )}
                                    </Grid2>
                                    <Grid2 size={2}>
                                        <PrimarySelector
                                            options={comprimateOptions}
                                            value={medicineOptions.find(option => option.value === medicine.quantity)}
                                            placeholder="Selectează cantitatea"
                                            onChange={(newValue, actionMeta) => changeMedicineQuantityValue(newValue, actionMeta, index)}
                                            index={index}
                                            preText="#"
                                            isError={medicalJournalForm.touched.medicines?.[index]?.quantity &&
                                                medicalJournalForm.errors.medicines?.[index]?.quantity}
                                        />
                                        {medicalJournalForm.touched.medicines?.[index]?.quantity &&
                                            medicalJournalForm.errors.medicines?.[index]?.quantity && (
                                                <div style={{ color: "red", fontSize: "0.8rem" }}>
                                                    {medicalJournalForm.errors.medicines[index].quantity}
                                                </div>
                                            )}
                                    </Grid2>
                                    <Grid2 size="grow" display="flex" justifyContent="flex-end">
                                        <Button
                                            variant="text"
                                            color="error"

                                            onClick={() => arrayHelpers.remove(index)}
                                            startIcon={<DeleteIcon />}
                                        >
                                            Șterge
                                        </Button>
                                    </Grid2>

                                </Grid2>
                            ))}
                            <Grid2 container>
                                <Grid2 size="grow">
                                    <Button
                                        variant="text"
                                        size="large"
                                        color="primary"
                                        onClick={() =>
                                            arrayHelpers.push({
                                                medicine: "",
                                                quantity: "",
                                            })
                                        }
                                        startIcon={<AddIcon />}
                                    >
                                        Adaugă Medicament
                                    </Button>
                                </Grid2>
                                <Grid2 size="auto">
                                    <Button size="large" type="submit" variant="contained" color="primary">
                                        Salvează
                                    </Button>
                                </Grid2>
                            </Grid2>

                        </Box>
                    )}
                />
            </FormikProvider>
        </form>
    );
};