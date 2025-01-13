import prisma from "../config/databaseInstance.js";


export const getLatestEndocrinologyTest = async (req, res) => {
    const { patientId } = req.params;

    try {
        const latestTest = await prisma.medical_tests.findFirst({
            where: {
                patient_id: parseInt(patientId), 
                category_id: 2, 
            },
            orderBy: {
                date: 'desc', 
            },
        });

        if (!latestTest) {
            return res.status(404).json({ message: 'No endocrinology tests found for this patient.' });
        }

        res.status(200).json(latestTest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};
