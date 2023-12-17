import * as sql from '../models/Comments.dao.js'
import HTTP_STATUS from '../../config/constants.js'
import { getPayload } from '../middlewares/users.middleware.js'

export const addComment = async (req, res) => {
  const { email } = getPayload(req.headers.authorization)
  const [{ id }] = await sql.getUserByEmail(email)
  const { id: id_publicacion } = req.params

  const { comentario } = req.body
  const results = await sql.addComment(id, id_publicacion, comentario)
  console.log('🦄 -> results', results)
  return res.status(HTTP_STATUS.created.code).json(results[0])
}

export const getCommentsByPublicationId = async (req, res) => {
  const { id } = req.params
  const results = await sql.getCommentsByPublicationId(id)
  if (!results.length) {
    return res
      .status(HTTP_STATUS.not_found.code)
      .json({
        code: HTTP_STATUS.not_found.code,
        message: 'No hay comentarios para esta publicación'
      })
  }

  return res.status(HTTP_STATUS.ok.code).json(results)
}
