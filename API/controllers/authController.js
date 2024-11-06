import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../config/databaseInstance.js';
import { getJWTSecret } from '../config/config.js';

export const signup =  async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    res.status(201).json({ message: 'Utilizator creat cu succes' });
  } catch (error) {
    res.status(400).json({ error: 'Adresa de email exista deja' });
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Adresa de email sau parola invalida' });
    }

    const token = jwt.sign({ userId: user.id }, getJWTSecret(), {
      expiresIn: '1h',
    });
    res.json({ token, email: user.email });
  } catch (error) {
    res.status(500).json({ error: 'Eroare interna' });
  }
}

