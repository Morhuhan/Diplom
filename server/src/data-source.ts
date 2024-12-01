// src/data-source.ts
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entity/User';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '2121212q',
  database: 'Library',
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});