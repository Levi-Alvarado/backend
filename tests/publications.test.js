import { test, expect } from 'vitest'
import request from 'supertest'
import server from '../src/server/index'

test('Should retrieve all publications successfully', async () => {
  const results = await request(server).get('/publicaciones')
  console.log('🦄 -> file: publications.test.js:1 -> results', results.body)
  expect(results.status).toBe(200)
})

test('Should create a new publication successfully', async () => {
  const responseLogin = await request(server).post('/usuarios/login').send({
    email: 'test@test.com',
    password: '123456'
  })
  const { token } = responseLogin.body
  const response = await request(server)
    .post('/publicaciones')
    .set('Authorization', `Bearer ${token}`)
    .send({
      fecha_publicacion: '2023-11-24T15:45:00Z',
      titulo: 'Celular Samsung Galaxy A14',
      descripcion: 'Samsung Galaxy A14 (Exynos) 5G Dual SIM 128 GB black 4 GB RAM',
      id_categoria: 2,
      precio: 199000,
      imagen: 'https://http2.mlstatic.com/D_NQ_NP_2X_724423-MLA54240685004_032023-F.webp'
    })
  expect(response.status).toBe(201)
  expect(response.body).toEqual({
    id: expect.any(Number),
    fecha_publicacion: expect.any(String),
    titulo: expect.any(String),
    descripcion: expect.any(String),
    id_categoria: expect.any(Number),
    precio: expect.any(Number),
    imagen: expect.any(String),
    id_usuario: expect.any(Number)
  })
})

test('Should retrieve a specific publication by id successfully', async () => {
  const responseLogin = await request(server).post('/usuarios/login').send({
    email: 'test@test.com',
    password: '123456'
  })

  const { token } = responseLogin.body
  const response = await request(server)
    .get('/publicaciones/2')
    .set('Authorization', `Bearer ${token}`)
  expect(response.status).toBe(200)

  expect(response.body).toEqual({
    id: expect.any(Number),
    fecha_publicacion: expect.any(String),
    titulo: expect.any(String),
    descripcion: expect.any(String),
    id_categoria: expect.any(Number),
    precio: expect.any(Number),
    imagen: expect.any(String),
    id_usuario: expect.any(Number)
  })
}
)

test('Should fail to update a publication due to insufficient permissions', async () => {
  const responseLogin = await request(server).post('/usuarios/login').send({
    email: 'ia5ap@test.com',
    password: '123456'
  })
  const { token } = responseLogin.body

  const response = await request(server)
    .put('/publicaciones/2')
    .set('Authorization', `Bearer ${token}`)
    .send({
      titulo: 'Celular Samsung Galaxy A14',
      descripcion: 'Samsung Galaxy A14 (Exynos) 5G Dual SIM 128 GB black 4 GB RAM',
      id_categoria: 2,
      precio: 199000,
      imagen: 'https://http2.mlstatic.com/D_NQ_NP_2X_724423-MLA54240685004_032023-F.webp'
    })
  expect(response.status).toBe(401)
  expect(response.body).toEqual({
    code: 401,
    message: 'No tienes permiso para editar esta publicación'
  })
})

test('Should fail to delete a publication due to insufficient permissions', async () => {
  const responseLogin = await request(server).post('/usuarios/login').send({
    email: 'ia5ap@test.com',
    password: '123456'
  })
  const { token } = responseLogin.body
  const response = await request(server)
    .delete('/publicaciones/2')
    .set('Authorization', `Bearer ${token}`)
  expect(response.status).toBe(401)
  expect(response.body).toEqual({
    code: 401,
    message: 'No tienes permiso para eliminar esta publicación'
  })
}
)
