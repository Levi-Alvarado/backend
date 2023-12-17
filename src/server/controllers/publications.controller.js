import * as sql from '../models/Publishes.dao.js'
import HTTP_STATUS from '../../config/constants.js'
import { getPayload } from '../middlewares/users.middleware.js'
/* getPublishes;
addPublication;
getPublication;
updatePublication;
deletePublication; */
export const getPublishes = async (req, res) => {
  const results = await sql.getPublishes()
  if (!results.length) {
    return res
      .status(HTTP_STATUS.not_found.code)
      .json({
        code: HTTP_STATUS.not_found.code,
        message: HTTP_STATUS.not_found.text
      })
  }

  return res.status(HTTP_STATUS.ok.code).json(results)
}

export const getPublication = async (req, res) => {
  const { id } = req.params
  const results = await sql.getPublishById(id)
  if (!results.length) {
    return res
      .status(HTTP_STATUS.not_found.code)
      .json({
        code: HTTP_STATUS.not_found.code,
        message: HTTP_STATUS.not_found.text
      })
  }
  return res.status(HTTP_STATUS.ok.code).json(results[0])
}

export const addPublication = async (req, res) => {
  console.log('🦄 -> file: publications.controller.js:65 -> addPublication -> req.body', req.body)
  const { titulo, descripcion, id_categoria, precio, imagen } = req.body
  const { email } = getPayload(req.headers.authorization)
  const [{ id }] = await sql.getUserByEmail(email)
  console.log('🦄 -> file: publications.controller.js:98 -> addPublication -> id', id)
  const results = await sql.addPublication(
    id,
    titulo,
    descripcion,
    id_categoria,
    precio,
    imagen
  )
  return res.status(HTTP_STATUS.created.code).json(results[0])
}

export const updatePublication = async (req, res) => {
  const { email } = getPayload(req.headers.authorization)
  const [{ id: user_id }] = await sql.getUserByEmail(email)
  const { id } = req.params
  const [{ id_usuario }] = await sql.getPublishById(id)
  if (user_id !== id_usuario) {
    return res.status(HTTP_STATUS.unauthorized.code).json({
      code: HTTP_STATUS.unauthorized.code,
      message: 'No tienes permiso para editar esta publicación'
    })
  }
  const { titulo, descripcion, id_categoria, precio, imagen } = req.body
  const results = await sql.updatePublication(id, titulo, descripcion, id_categoria, precio, imagen)
  return res.status(HTTP_STATUS.ok.code).json(results[0])
}

export const deletePublication = async (req, res) => {
  const { id } = req.params
  const { email } = getPayload(req.headers.authorization)
  const [{ id: user_id }] = await sql.getUserByEmail(email)
  const [{ id_usuario }] = await sql.getPublishById(id)
  if (user_id !== id_usuario) {
    return res.status(HTTP_STATUS.unauthorized.code).json({
      code: HTTP_STATUS.unauthorized.code,
      message: 'No tienes permiso para eliminar esta publicación'
    })
  }
  await sql.deletePublication(id)
  return res.status(HTTP_STATUS.no_content.code).json()
}

export const getPublishesByUserId = async (req, res) => {
  const { id } = getPayload(req.headers.authorization)
  const results = await sql.getPublishesByUserId(id)
  if (!results.length) {
    return res
      .status(HTTP_STATUS.not_found.code)
      .json({
        code: HTTP_STATUS.not_found.code,
        message: HTTP_STATUS.not_found.text
      })
  }
  return res.status(HTTP_STATUS.ok.code).json(results)
}

export const categories = async (req, res) => {
  console.log('🦄 -> file: publications.controller.js:153 -> categories -> categories')
  const results = await sql.getCategories()
  if (!results.length) {
    return res
      .status(HTTP_STATUS.not_found.code)
      .json({
        code: HTTP_STATUS.not_found.code,
        message: HTTP_STATUS.not_found.text
      })
  }
  return res.status(HTTP_STATUS.ok.code).json(results)
}
