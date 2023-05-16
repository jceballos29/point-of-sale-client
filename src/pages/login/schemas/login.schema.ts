import * as yup from 'yup';

export const loginSchema = yup.object({
  database: yup.string().required(
    'Base de datos requerida',
  ),
  username: yup.string().required(
    'Usuario requerido',
  ),
  password: yup.string().required(
    'Contraseña requerida',
  ),
}).required();