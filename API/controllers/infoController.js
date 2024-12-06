import prisma from "../config/databaseInstance.js";

export const getAllNameAndDescription = async (_, res) => {
    try {
        const informatiiCategorieBoala = await prisma.informatii_Categorie_Boala.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                imageId: true
            },
        });

        res.json({
            message: 'Informatiile despre categoriile de boli, agregate cu succes',
            data: informatiiCategorieBoala,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Eroare interna' });
    }
};

export const getByName = async (req, res) => {
    const {name} = req.params   
    
    const decodedName = decodeURIComponent(name);

    try {
        const data = await prisma.informatii_Categorie_Boala.findFirst({
            where: { name: decodedName }
        });

        if (!data) {
            return res.status(404).json({ error: 'File not found' });
        }

        res.json({
            message: 'Articolul a fost agregat cu succes',
            data,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Eroare interna' });
    }
}
