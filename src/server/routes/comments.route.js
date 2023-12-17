import express from 'express'
import * as comments from '../controllers/comments.controller.js'
import { verifyToken } from '../middlewares/users.middleware.js'

const router = express.Router()
// Obtener usuario por token
router.post('/publicaciones/:id/comentarios', verifyToken, comments.addComment)
router.get('/publicaciones/:id/comentarios', verifyToken, comments.getCommentsByPublicationId)
export default router
