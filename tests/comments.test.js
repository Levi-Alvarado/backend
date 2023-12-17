import { test, expect } from 'vitest'
import request from 'supertest'
import server from '../src/server/index'

test('Should retrieve all comments successfully', async () => {
  const responseLogin = await request(server).post('/usuarios/login').send({
    email: 'test@test.com',
    password: '123456'
  })
  const { token } = responseLogin.body
  const results = await request(server).get('/publicaciones/1/comentarios')
    .set('Authorization', `Bearer ${token}`)
  console.log('🦄 -> file: comments.test.js:1 -> results', results.body)
  expect(results.status).toBe(200)
})

test('Should create a new comment successfully', async () => {
  const responseLogin = await request(server).post('/usuarios/login').send({
    email: 'test@test.com',
    password: '123456'
  })
  const { token } = responseLogin.body
  const response = await request(server)
    .post('/publicaciones/1/comentarios')
    .set('Authorization', `Bearer ${token}`)
    .send({
      comentario: 'Excelente producto'
    })
  expect(response.status).toBe(201)
  expect(response.body).toEqual({
    id: expect.any(Number),
    contenido: expect.any(String),
    id_publicacion: expect.any(Number),
    id_usuario: expect.any(Number),
    fecha_comentario: expect.any(String)
  })
})
