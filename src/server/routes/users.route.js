import express from 'express'
import * as usuarios from '../controllers/users.controller.js'
import { verifyToken } from '../middlewares/users.middleware.js'

const router = express.Router()
// Login y registro de usuarios
router.post('/usuarios/registro', usuarios.register)
router.post('/usuarios/login', usuarios.login)

// Obtener usuario por token
router.get('/usuarios', verifyToken, usuarios.getUserByToken)

export default router
