import HTTP_STATUS from '../../config/constants.js'
import { jwtVerify } from '../../utils/jwt.js'

export const verifyToken = (req, res, next) => {
  console.log('🦄 -> file: users.middleware.js:7 -> req.headers', req.headers)
  const authorizationHeader = req.headers.authorization
  if (!authorizationHeader) {
    return res.status(HTTP_STATUS.unauthorized.code).json({
      code: HTTP_STATUS.unauthorized.code,
      message: HTTP_STATUS.unauthorized.text.op1
    })
  }

  const [bearer, token] = authorizationHeader.split(' ')
  if (bearer !== 'Bearer' || !token) {
    return res.status(HTTP_STATUS.unauthorized.code).json({
      code: HTTP_STATUS.unauthorized.code,
      message: HTTP_STATUS.unauthorized.text.op2
    })
  }

  try {
    jwtVerify(token) && next()
  } catch (error) {
    res.status(HTTP_STATUS.unauthorized.code).json({
      code: HTTP_STATUS.unauthorized.code,
      message: HTTP_STATUS.unauthorized.text.op3
    })
  }
}

export const getPayload = (authorizationHeader) => {
  const token = authorizationHeader.split(' ')[1]
  return jwtVerify(token)
}
