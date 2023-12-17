import { test, expect } from 'vitest'
import request from 'supertest'
import server from '../src/server/index'

const randomName = () => Math.random().toString(36).substring(7)
test('Should register a new user successfully', async () => {
  const name = randomName()
  const response = await request(server)
    .post('/usuarios/registro')
    .send({
      name,
      email: `${name}@test.com`,
      password: '123456'
    })
  console.log('🦄 -> file: server.test.js:100 -> response', response.body)
  expect(response.status).toBe(201)
  expect(response.body).toEqual({
    id: expect.any(Number),
    nombre: name,
    correo_electronico: `${name}@test.com`
  })
})

test('Should login an existing user successfully', async () => {
  const responseLogin = await request(server).post('/usuarios/login').send({
    email: 'test@test.com',
    password: '123456'
  })
  expect(responseLogin.status).toBe(200)
  expect(responseLogin.body).toEqual({
    token: expect.any(String)
  })
})

test('Should get all users without exposing their passwords', async () => {
  const results = await request(server).post('/usuarios/login').send({
    email: 'test@test.com',
    password: '123456'
  })
  const { token } = results.body
  const response = await request(server)
    .get('/usuarios')
    .set('Authorization', `Bearer ${token}`)
  expect(response.status).toBe(200)

  expect(response.body).not.include({
    contrasena: expect.any(String)
  })
})
