import prisma from "../config/databaseInstance.js";

export const getPersonalData = async (req, res) => {
    const { userId } = req.user;
    try{
        const personalData = await prisma.personal_Data.findUnique({
            where:{
                userId
            }
        })
        res.status(200).json({message: "Datele au fost agregate cu succes", data: personalData})
    }catch(error){        
        console.error(error.message)
        res.status(500).json({ error: 'Eroare interna' });
    }
}



export const personalDataSetup = async (req, res) => {
    const { cnp, firstName, lastName, address, phoneNumber } = req.body;
    const { userId } = req.user;

    try {
        const personalData = await prisma.personal_Data.create({
            data: {
                cnp,
                firstName,
                lastName,
                address,
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



export const personalDataUpdate = async (req, res) => {
    const { cnp, firstName, lastName, address, phoneNumber } = req.body;

    const { userId } = req.user;
    try{
        await prisma.personal_Data.update({
            where: {
              userId,
            },
            data: {
              cnp,
              firstName,
              lastName,
              address,
              phoneNumber
            },
          })
          res.status(200).json({message: 'Datele au fost editate cu succes'})
    }catch(error){
        console.error(error.message)
        res.status(500).json({ error: 'Eroare interna' });
    }
}
