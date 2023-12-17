import * as sql from '../models/Users.dao.js'
import HTTP_STATUS from '../../config/constants.js'
import { getPayload, jwtSing } from '../../utils/jwt.js'
import { compare, encrypt } from '../../utils/crypter.js'

export const register = (req, res) => {
  const { email, password, name } = req.body
  if (!email || !password || !name) return res.status(HTTP_STATUS.bad_request.code).json({ code: HTTP_STATUS.bad_request.code, message: HTTP_STATUS.bad_request.text })
  const encryptedPassword = encrypt(password)
  sql
    .register(name, email, encryptedPassword)
    .then(([user]) => {
      console.log('🦄 -> file: usuarios.controller.js:13 -> .then -> user', user)
      return res
        .status(HTTP_STATUS.created.code)
        .json({ id: user.id, nombre: user.nombre, correo_electronico: user.correo_electronico })
    }
    )
    .catch((error) =>
      res.status(HTTP_STATUS.internal_eerver_error.code).json(error)
    )
}

export const login = async (req, res) => {
  const { email, password } = req.body
  console.log('🦄 -> { email, password }', { email, password })

  if (!email || !password) return res.status(HTTP_STATUS.bad_request.code).json({ code: HTTP_STATUS.bad_request.code, message: HTTP_STATUS.bad_request.text })
  const results = await sql.getUserByEmail(email)
  console.log('🦄 -> file: usuarios.controller.js:26 -> login -> results', results)
  if (!results.length) return res.status(HTTP_STATUS.not_found.code).json({ code: HTTP_STATUS.not_found.code, message: HTTP_STATUS.not_found.text })
  const [{ contrasena }] = results
  compare(password, contrasena)
    .then((isValid) => {
      isValid
        ? res
          .status(HTTP_STATUS.ok.code)
          .json({ token: jwtSing({ email: req.body.email }), user: results[0] })
        : res
          .status(HTTP_STATUS.not_found.code)
          .json({
            code: HTTP_STATUS.not_found.code,
            message: HTTP_STATUS.not_found.text
          })
    })
    .catch((error) =>
      res.status(HTTP_STATUS.internal_eerver_error.code).json(error)
    )
}

export const getUserByToken = async (req, res) => {
  const authorizationHeader = req.headers.authorization
  const token = authorizationHeader.split(' ')[1]
  const { email } = getPayload(token)
  const results = await sql.getUserByEmail(email)
  if (!results.length) return res.status(HTTP_STATUS.internal_eerver_error.code).json({ code: HTTP_STATUS.internal_eerver_error.code, message: HTTP_STATUS.internal_eerver_error.text })

  console.log('🦄 -> file: usuarios.controller.js:40 -> getUserByToken -> results', results)
  const [{ id, nombre, correo_electronico }] = results

  return res.status(HTTP_STATUS.ok.code).json({ id, nombre, correo_electronico })
}
