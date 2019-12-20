import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Vocabulary } from '.'

const app = () => express(apiRoot, routes)

let vocabulary

beforeEach(async () => {
  vocabulary = await Vocabulary.create({})
})

test('POST /vocabularies 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ text: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.text).toEqual('test')
})

test('GET /vocabularies 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /vocabularies/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${vocabulary.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(vocabulary.id)
})

test('GET /vocabularies/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /vocabularies/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${vocabulary.id}`)
    .send({ text: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(vocabulary.id)
  expect(body.text).toEqual('test')
})

test('PUT /vocabularies/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ text: 'test' })
  expect(status).toBe(404)
})

test('DELETE /vocabularies/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${vocabulary.id}`)
  expect(status).toBe(204)
})

test('DELETE /vocabularies/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
