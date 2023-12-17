import express from 'express'
import * as publications from '../controllers/publications.controller.js'
import { verifyToken } from '../middlewares/users.middleware.js'

const router = express.Router()
// Obtener usuario por token
router.get('/publicaciones', publications.getPublishes)
router.get('/categorias', publications.categories)
router.post('/publicaciones', verifyToken, publications.addPublication)
router.get('/publicaciones/:id', verifyToken, publications.getPublication)
router.put('/publicaciones/:id', verifyToken, publications.updatePublication)
router.delete('/publicaciones/:id', verifyToken, publications.deletePublication)
router.get('/publicaciones/usuario', verifyToken, publications.getPublishesByUserId)

export default router
