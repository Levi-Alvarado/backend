import db from '../database/db.js'

/*
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    correo_electronico VARCHAR(100) NOT NULL,
    contrasena VARCHAR(50) NOT NULL,
    fecha_creacion TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
*/

export const register = async (nombre, correo_electronico, contrasena) =>
  await db('INSERT INTO usuarios (nombre, correo_electronico, contrasena) VALUES ($1, $2, $3) RETURNING *;', [nombre, correo_electronico, contrasena])

export const getUserByEmail = async (correo_electronico) =>
  await db('SELECT * FROM usuarios WHERE correo_electronico = $1;', [correo_electronico])

export const test = async () =>
  await db('SELECT NOW();') // SELECT NOW() AS now;
