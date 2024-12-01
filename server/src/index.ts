import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import type { Request, Response } from 'express';
import { AppDataSource } from './data-source';
import { User } from './entity/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = express();
const port = 4444;

app.use(express.json());
app.use(cors());

// Подключение к базе данных
AppDataSource.initialize()
  .then(() => {
    console.log('Соединение с базой данных установлено');
  })
  .catch((error) => console.log(error));

// Регистрация с хешированием пароля
app.post('/register', async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User();
    user.username = username;
    user.password = hashedPassword;
    user.role = role;

    await AppDataSource.manager.save(user);

    res.status(201).send('Пользователь зарегистрирован');
  } catch (error) {
    console.error(error);
    res.status(500).send('Ошибка сервера');
  }
});

// Вход
app.post('/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await AppDataSource.manager.findOne(User, {
      where: { username },
    });

    if (!user) return res.status(400).send('Пользователь не найден');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Неверный пароль');

    if (!process.env.SECRET_KEY) {
      console.error('SECRET_KEY не определен');
      return res.status(500).send('Серверная ошибка: секретный ключ не установлен');
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: '1h' }
    );
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Ошибка сервера');
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});