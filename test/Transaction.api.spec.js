/* eslint-disable */
const request = require('supertest')
const app = require('../app/index')
const dotenv = require('dotenv')
dotenv.config()

describe('API create transaction', () => {
  it('success create transaction', async () => {
    const loginCredentials = {
      email: 'memberc8@mail.com',
      password: 'admin1234',
    }

    const loginResponse = await request(app)
      .post('/api/v1/auth/member/login')
      .send(loginCredentials)

    expect(loginResponse.statusCode).toBe(200)
    expect(loginResponse.body.status).toBe('Success')
    expect(loginResponse.body.message).toBe('Login berhasil')

    const userToken = loginResponse.body.data.token

    const courseId = 4
    const responseTransaction = await request(app)
      .post(`/api/v1/transaction/${courseId}`)
      .set(`Authorization`, `Bearer ${userToken}`)
      .send({})

    expect(responseTransaction.statusCode).toBe(201)
    expect(responseTransaction.body.status).toBe('Success')
  })

  it('Failed create transaction, order Id not found', async () => {
    const loginCredentials = {
      email: 'memberc8@mail.com',
      password: 'admin1234',
    }

    const loginResponse = await request(app)
      .post('/api/v1/auth/member/login')
      .send(loginCredentials)

    expect(loginResponse.statusCode).toBe(200)
    expect(loginResponse.body.status).toBe('Success')
    expect(loginResponse.body.message).toBe('Login berhasil')

    const userToken = loginResponse.body.data.token

    const invalidCourseId = 9999 // ID yang tidak ada

    const responseTransaction = await request(app)
      .post(`/api/v1/transaction/${invalidCourseId}`)
      .set(`Authorization`, `Bearer ${userToken}`)
      .send({})

    expect(responseTransaction.statusCode).toBe(404)
    expect(responseTransaction.body.status).toBe('Failed')
    expect(responseTransaction.body.message).toBe(
      `Kursus dengan ID: ${invalidCourseId} tidak ditemukan`
    )
  })
})

describe('API admin get data transaction', () => {
  it('success get data transaction', async () => {
    const user = {
      email: 'adminc8@mail.com',
      password: 'admin1234',
    }
    const response = await request(app)
      .post('/api/v1/auth/admin/login')
      .send(user)
    expect(response.statusCode).toBe(200)
    expect(response.body.status).toBe('Success')
    expect(response.body.message).toBe('Berhasil login')
    const userToken = response.body

    const responseData = await request(app)
      .get('/api/v1/transaction')
      .set('Authorization', `Bearer ${userToken.data}`)

    expect(responseData.statusCode).toBe(200)
    expect(responseData.body.status).toBe('Success')
  })
})

describe('API get payment detail', () => {
  it('success get payment detail', async () => {
    const loginCredentials = {
      email: 'memberc8@mail.com',
      password: 'admin1234',
    }

    const loginResponse = await request(app)
      .post('/api/v1/auth/member/login')
      .send(loginCredentials)

    expect(loginResponse.statusCode).toBe(200)
    expect(loginResponse.body.status).toBe('Success')
    expect(loginResponse.body.message).toBe('Login berhasil')

    const userToken = loginResponse.body.data.token
    const courseId = 4
    const responseTransaction = await request(app)
      .post(`/api/v1/transaction/${courseId}`)
      .set(`Authorization`, `Bearer ${userToken}`)

    expect(responseTransaction.statusCode).toBe(201)
    expect(responseTransaction.body.status).toBe('Success')

    const orderId = responseTransaction.body.createdTransactionData.orderId

    const responseDataCourse = await request(app)
      .get(`/api/v1/transaction/${orderId}`)
      .set(`Authorization`, `Bearer ${userToken}`)

    expect(responseDataCourse.statusCode).toBe(200)
    expect(responseDataCourse.body.status).toBe('Success')
  })
})
