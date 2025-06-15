import { categoriesWithParameters } from "../controllers/medicalCategoriesController.js";

export const getMedicalCategoriesAndParameters = async (req, res) => {
    try {
        const categories = await categoriesWithParameters();
        return res.status(200).json(categories);
    } catch (error) {
        console.error('Eroare la incarcarea categoriilor medicale si parametrii:', error);
        res.status(500).json({
            error: 'Nu s-au putut incarca categoriile medicale si parametrii.',
        });
    }
}


export const createMedicalAnalysis = async (req, res) => {
    const { testingDate, analyzeTitle, institution, doctor, notes, categories } = req.body;
    const uploadedFile = req.file;
    const { userId } = req.user;

    const parsedCategories = JSON.parse(categories || '[]');


    try {
        let fileLink = null;

        if (uploadedFile) {
            fileLink = `s3://bucket/${uploadedFile.originalname}`;
        }


        const analyze = await prisma.medical_Analyze.create({
            data: {
                testingDate: testingDate ? new Date(testingDate) : null,
                analyzeTitle,
                institution,
                doctor,
                notes,
                file: fileLink,
                userId,
            }
        });

        for (const category of parsedCategories) {
            const categoryRecord = await prisma.medical_Category.findUnique({
                where: { name: category.name },
                include: { parameters: true },
            });

            if (!categoryRecord) continue;

            await prisma.medical_Analyze_Category.create({
                data: {
                    analyzeId: analyze.id,
                    categoryId: categoryRecord.id,
                },
            });

            for (const param of category.parameters) {
                const matchedParam = categoryRecord.parameters.find(p => p.name === param.name);
                if (!matchedParam) continue;

                await prisma.medical_Analyze_Result.create({
                    data: {
                        analyzeId: analyze.id,
                        parameterId: matchedParam.id,
                        value: param.value,
                    },
                });
            }
        }


        return res.status(201).json({
            analyzeTitle: analyze.analyzeTitle,
            testingDate: analyze.testingDate,
            createdAt: analyze.createdAt,
            checkedBy: analyze?.assignedDoctor || "Nepreluat",
        });

    } catch (error) {
        console.error('Eroare la crearea analizei medicale:', error);
        res.status(500).json({
            error: 'Nu s-a putut crea analiza medicala.',
        });
    }
}

export const getUserAnalyzesById = async (req, res) => {
    const { userId: paramUserId } = req.params;
    const userId = parseInt(paramUserId);

    try {
        const analyzes = await prisma.medical_Analyze.findMany({
            where: {
                userId: userId
            },
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                id: true,
                analyzeTitle: true,
                testingDate: true,
                createdAt: true,
                institution: true,
                assignedDoctor: {
                    select: {
                        id: true,
                        email: true,
                        role: true
                    }
                }
            }
        });

        return res.status(200).json(analyzes);

    } catch (error) {
        console.error('Error fetching user analyzes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};