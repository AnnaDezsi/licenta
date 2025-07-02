import { categoriesWithParameters } from "../controllers/medicalCategoriesController.js";
import { Utils } from "../utils/utils.js";
import { uploadBufferToS3 } from "./blobService.js";
import axios from 'axios'

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
        let fileRecord = null;

        if (uploadedFile) {
            const { key, name, mimeType } = await uploadBufferToS3(
                uploadedFile.buffer,
                uploadedFile.originalname,
                uploadedFile.mimetype
            );

            fileRecord = await prisma.fileS3.create({
                data: {
                    key,
                    name,
                    mimeType,
                    uploaderId: userId,
                    description: 'File uploaded with medical analysis',
                },
            });
        }

        const analyze = await prisma.medical_Analyze.create({
            data: {
                testingDate: testingDate ? new Date(testingDate) : null,
                analyzeTitle,
                institution,
                doctor,
                notes,
                userId,
                fileId: fileRecord?.id || null,
            },
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
                const matchedParam = categoryRecord.parameters.find((p) => p.name === param.name);
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
            checkedBy: analyze?.assignedDoctor || 'Nepreluat',
            institution: analyze?.institution,
        });
    } catch (error) {
        console.error('Eroare la crearea analizei medicale:', error);
        res.status(500).json({
            error: 'Nu s-a putut crea analiza medicala.',
        });
    }
};


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
                doctor: true,
                notes: true,
                file: {
                    select: {
                        id: true,
                        name: true
                    }
                },

                assignedDoctor: {
                    select: {
                        id: true,
                        email: true,
                        role: true,
                    },
                },
                categories: {
                    include: {
                        category: true,
                    },
                },
                results: {
                    include: {
                        parameter: {
                            select: {
                                name: true,
                                ro_l18n: true,
                                unit: true,
                                type: true,
                                medicalCategoryId: true,
                            },
                        },
                    },
                },
            },
        });


        console.log(analyzes)
        return res.status(200).json(analyzes);

    } catch (error) {
        console.error('Error fetching user analyzes:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const startMLForAnalyzeId = async (req, res) => {
    const { analyzeId } = req.body;

    try {
        const results = await prisma.medical_Analyze_Result.findMany({
            where: {
                analyzeId
            },
            include: {
                parameter: true,
                analyze: {
                    include: {
                        user: {
                            include: {
                                personalData: {
                                    include: {
                                        details: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });


        const cnp = results[0].analyze.user.personalData?.cnp;
        const pregnancies = results[0].analyze.user.personalData?.details?.nrSarciniAnterioare;


        const payload = {};

        for (const result of results) {
            const name = result.parameter.name;
            payload[name] = result.value;
        }

        payload['Age'] = Utils.getAgeFromCNP(cnp);
        payload['Pregnancies'] = pregnancies;

        const responseFromML = await axios.post(process.env.ML_APP_PATH + "/predict", {
            parameters: payload
        });

        res.status(200).json(responseFromML.data)

    } catch (error) {
        console.error('Error encountered by ML', error);
        res.status(500).json({ error: 'Internal server error' })
    }


}