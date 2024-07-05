import { envs } from './envs';

export const dbConfig = {
  client: envs.dbType,
  connection: {
    host: 'localhost',
    user: 'tu_usuario',
    password: 'tu_contraseña',
    database: 'tu_base_de_datos',
  },
  pool: {
    min: 2,
    max: 10,
  },
};
