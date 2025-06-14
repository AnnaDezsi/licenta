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