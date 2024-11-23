import prisma from "../config/databaseInstance.js";

export const personalDataSetup = async (req, res) => {
    const { cnp, firstName, lastName, gender, birthDate, phoneNumber } = req.body;
    const { userId } = req.user;

    try {
        const personalData = await prisma.personal_Data.create({
            data: {
                cnp,
                firstName,
                lastName,
                phoneNumber,
                user: { connect: { id: userId } },
            },
        });

        res.status(201).json({
            message: "Datele au fost incarcate cu success!",
            data: personalData,
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: 'Eroare interna' });
    }

}