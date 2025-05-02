import prisma from "../config/databaseInstance.js";

export const createMedicamentatie = async (req, res) => {
    const { journalName, startDate, endDate, medicines } = req.body;
    const { userId } = req.user;
  
    try {
      const alreadyRegistered = await prisma.medicamentatie.findFirst({
        where: {
          name: journalName,
          userId: userId, 
        },
      });
  
      if (alreadyRegistered) {
        return res.status(401).json({
          error: 'Deja exista un jurnal cu numele acesta',
        });
      }
  
      const medicamentatieEntries = await Promise.all(
        medicines.map(async (medicine) => {
          const medicament = await prisma.medicamente.findUnique({
            where: { name: medicine.medicine },
          });
  
          if (!medicament) {
            throw new Error(`Medicamentul cu numele ${medicine.medicine} nu a fost gasit.`);
          }
  
          return await prisma.medicamentatie.create({
            data: {
              name: !journalName ? new Date(startDate).toDateString() : journalName,
              startDate,
              endDate,
              medicamentId: medicament.id,
              quantity: medicine.quantity,
              userId,
            },
            include: {
              medicament: true,
            },
          });
        })
      );
  
      const result = {
        journalName: medicamentatieEntries[0].name,
        startDate: medicamentatieEntries[0].startDate,
        endDate: medicamentatieEntries[0].endDate,
        medicines: medicamentatieEntries.map(med => ({
          medicine: med.medicament.name,
          quantity: med.quantity,
        })),
      };
  
      res.status(201).json({
        message: 'Medicamentatie adaugata cu succes!',
        data: result,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Ooops! Ceva nu a functionat bine. Te rog incearca mai tarziu',
      });
    }
  };
  


  export const getMedicamentatie = async (req, res) => {
    const { userId } = req.user;
  
    try {
      const medicamentatieEntries = await prisma.medicamentatie.findMany({
        where: {
          userId,
        },
        include: {
          medicament: true,
        },
      });
  
      const groupedByName = medicamentatieEntries.reduce((acc, entry) => {
        if (!acc[entry.name]) {
          acc[entry.name] = {
            journalName: entry.name,
            startDate: entry.startDate,
            endDate: entry.endDate,
            medicines: [],
          };
        }
  
        acc[entry.name].medicines.push({
          medicine: entry.medicament.name,
          quantity: entry.quantity,
        });
  
        return acc;
      }, {});
  
      const result = Object.values(groupedByName);
  
      // Return the formatted result
      res.status(200).json({
        message: 'Medicamentatie records retrieved successfully!',
        data: result,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: 'Ooops! Ceva nu a functionat bine. Te rog incearca mai tarziu',
      });
    }
  };
  