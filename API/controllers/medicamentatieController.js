import prisma from "../config/databaseInstance.js";

export const createMedicamentatie = async (req, res) => {
  const { name, startDate, endDate, medicines } = req.body;
  const { userId } = req.user;

  try {
    const existing = await prisma.medicamentatie.findFirst({
      where: {
        name,
        userId,
      },
    });

    if (existing) {
      return res.status(409).json({
        error: "Deja exista un jurnal de medicamentatie cu acest nume",
      });
    }

    const medicamentatie = await prisma.medicamentatie.create({
      data: {
        name: name || new Date(startDate).toDateString(),
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        quantity: 0,
        userId,
      },
    });

    for (const medicine of medicines) {
      const medicament = await prisma.medicamente.findUnique({
        where: { name: medicine.name },
      });

      if (!medicament) {
        return res.status(404).json({
          error: `Medicamentul '${medicine.name}' nu a fost gasit.`,
        });
      }

      await prisma.medicamentatie_Medicamente.create({
        data: {
          medicamentatieId: medicamentatie.id,
          medicamentId: medicament.id,
          quantity: medicine.quantity,
        },
      });
    }

    const linked = await prisma.medicamentatie_Medicamente.findMany({
      where: { medicamentatieId: medicamentatie.id },
      include: {
        medicament: true,
      },
    });

    const response = {
      id: medicamentatie.id,
      name: medicamentatie.name,
      startDate: medicamentatie.startDate,
      endDate: medicamentatie.endDate,
      medicines: linked.map(link => ({
        name: link.medicament.name,
        quantity: link.quantity,
      })),
    };

    res.status(201).json({
      message: "Medicamentatie adaugata cu succes!",
      data: response,
    });
  } catch (error) {
    console.error("Eroare la crearea medicamentatiei:", error);
    res.status(500).json({
      error: "Ooops! Ceva nu a functionat bine. Te rog incearca mai tarziu.",
    });
  }
};




export const getMedicamentatie = async (req, res) => {
  const { userId } = req.user;

  try {
    const medicamentaties = await prisma.medicamentatie.findMany({
      where: { userId },
      include: {
        medicamenteLinks: {
          include: {
            medicament: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const result = medicamentaties.map(entry => ({
      id: entry.id,
      name: entry.name,
      startDate: entry.startDate,
      endDate: entry.endDate,
      medicines: entry.medicamenteLinks.map(link => ({
        name: link.medicament.name,
        quantity: link.quantity,
      })),
    }));

    res.status(200).json({
      message: "Medicamentatie records retrieved successfully!",
      data: result,
    });
  } catch (error) {
    console.error("Eroare la obtinerea medicamentatiei:", error);
    res.status(500).json({
      error: "Ooops! Ceva nu a functionat bine. Te rog incearca mai tarziu.",
    });
  }
};
