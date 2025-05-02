import prisma from "../config/databaseInstance.js";

export const getPersonalData = async (req, res) => {
  const { userId } = req.user;
  try {
    const personalData = await prisma.personal_Data.findUnique({
      where: {
        userId
      }
    })
    res.status(200).json({ message: "Datele au fost agregate cu succes", data: personalData })
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: 'Eroare interna' });
  }
}

export const getPersonalDataById = async (req, res) => {
  const { userId } = req.params;
  try {
    const personalData = await prisma.personal_Data.findUnique({
      where: {
        userId: +userId, 
      }
    });
    
    if (!personalData) {
      return res.status(404).json({ error: "No personal data found for this user" });
    }

    res.status(200).json({ message: "Datele au fost agregate cu succes", data: personalData });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Eroare interna' });
  }
};



export const personalDataSetup = async (req, res) => {
  const { cnp, firstName, lastName, address, phoneNumber } = req.body;
  const { userId } = req.user;

  try {

    const existingPersonalData = await prisma.personal_Data.findUnique({
      where: { cnp }
    });

    if (existingPersonalData) {
      return res.status(400).json({
        message: 'CNP-ul introdus exista deja in baza de date.',
      });
    }

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
  try {
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
    res.status(200).json({ message: 'Datele au fost editate cu succes' })
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: 'Eroare interna' });
  }
}

export const userPersonalDataUpdate = async (req, res) => {
  const { cnp, firstName, lastName, address, phoneNumber } = req.body;

  const { userId } = req.params;
  try {
    await prisma.personal_Data.update({
      where: {
        userId: +userId,
      },
      data: {
        cnp,
        firstName,
        lastName,
        address,
        phoneNumber
      },
    })
    res.status(200).json({ message: 'Datele au fost editate cu succes' })
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ error: 'Eroare interna' });
  }
}

export const getAllClients = async (req, res) => {
  try {
    const clients = await prisma.user.findMany({
      where: {
        role: 'CLIENT',
      },
      select: {
        id: true,
        email: true,
        personalData: {
          select: {
            id: true,
            cnp: true,
            firstName: true,
            lastName: true,
            address: true,
            phoneNumber: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    res.status(200).json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching clients' });
  }
};

export const getAllUsers = async (_, res) => {
  try {
    const clients = await prisma.user.findMany({
      where: {
        NOT: {
          role: "ADMIN"
        }
      },
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        personalData: {
          select: {
            id: true,
            cnp: true,
            firstName: true,
            lastName: true,
            address: true,
            phoneNumber: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    res.status(200).json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching clients' });
  }
}



