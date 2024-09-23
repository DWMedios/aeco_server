import 'reflect-metadata';
import { runSeeder } from 'typeorm-extension';
import AppDataSource from '../../db/typeorm.config';
import MainSeeder from './main.seeder';
const run = async () => {
  try {
    await AppDataSource.initialize();

    await runSeeder(AppDataSource, MainSeeder);

    console.log('Seeders ejecutados correctamente');
  } catch (error) {
    console.error('Error al ejecutar los seeders', error);
  } finally {
    await AppDataSource.destroy();
  }
};

run();
