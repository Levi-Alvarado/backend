const HTTP_STATUS = {
  ok: { code: 200 },
  created: { code: 201 },
  unauthorized: {
    code: 401,
    text: {
      op1: 'Token no proporcionado.',
      op2: 'Formato de token inválido.',
      op3: 'Token inválido.'
    }
  },
  not_found: { code: 404, text: 'El usuario o la contraseña son incorrectos.' },
  internal_eerver_error: { code: 500 },
  bad_request: { code: 400, text: 'Bad request.' }
}

export default HTTP_STATUS
