import db from '../database/db.js'
/* insert into publicaciones (id_usuario, titulo, descripcion, id_categoria, imagen, precio) values (1, 'Laptop HP 15s-eq1023la', 'Laptop HP 15s-eq1023la, 15.6", AMD Ryzen 5 4500U, 8GB RAM, 256GB SSD, Windows 10 Home', 1, 'https://http2.mlstatic.com/D_NQ_NP_2X_732841-MLC71646608420_092023-F.webp', 500000);
 */
export const getPublishes = async () =>
  await db('SELECT * FROM publicaciones;')

export const getPublishById = async (id) =>
  await db('SELECT * FROM publicaciones WHERE id = $1;', [id])

export const addPublication = async (id_usuario, titulo, descripcion, id_categoria, precio, imagen) =>
  await db('INSERT INTO publicaciones (id_usuario, titulo, descripcion, id_categoria, precio, imagen) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;', [id_usuario, titulo, descripcion, id_categoria, precio, imagen])

export const updatePublication = async (id, titulo, descripcion, id_categoria, precio, imagen) =>
  await db('UPDATE publicaciones SET titulo = $2, descripcion = $3, id_categoria = $4, precio = $5, imagen = $6 WHERE id = $1 RETURNING *;', [id, titulo, descripcion, id_categoria, precio, imagen])

export const deletePublication = async (id) =>
  await db('DELETE FROM publicaciones WHERE id = $1;', [id])

export const getUserByEmail = async (correo_electronico) =>
  await db('SELECT * FROM usuarios WHERE correo_electronico = $1;', [
    correo_electronico
  ])

export const getCategories = async () =>
  await db('SELECT * FROM categorias;')
