import db from '../database/db.js'

export const getCommentsByPublicationId = async (id_publicacion) =>
  await db('SELECT * FROM comentarios WHERE id_publicacion = $1;', [id_publicacion])

export const addComment = async (id_usuario, id_publicacion, contenido) =>
  await db('INSERT INTO comentarios (id_usuario, id_publicacion, contenido) VALUES ($1, $2, $3) RETURNING *;', [id_usuario, id_publicacion, contenido])

export const getUserByEmail = async (correo_electronico) =>
  await db('SELECT * FROM usuarios WHERE correo_electronico = $1;', [
    correo_electronico
  ])
