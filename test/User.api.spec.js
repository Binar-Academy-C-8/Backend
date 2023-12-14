/* eslint-disable */
const request = require('supertest')
const app = require('../app/index')
const { faker } = require('@faker-js/faker')
require('dotenv').config()

describe('API Get All Users', () => {
  it('success get all users', async () => {
    const response = await request(app).get('/api/v1/user/')
    expect(response.statusCode).toBe(200)
  })
})

describe('API Get User By Email', () => {
  it('success get user by email', async () => {
    const userEmail = 'nuralirajab03@gmail.com'
    const response = await request(app).get(
      `/api/v1/user/get?email=${userEmail}`
    )
    expect(response.statusCode).toBe(200)
  })

  it('failed get user by email because email not found', async () => {
    const userEmail = 'rajab39ali27@gmail.com'
    const response = await request(app).get(
      `/api/v1/user/get?email=${userEmail}`
    )
    console.log(response.status)
    console.log(response.body)
    expect(response.statusCode).toBe(404)
    expect(response.body.message).toBe('Pengguna tidak ditemukan')
  })
})

describe('API update user', () => {
  it('success update data car', async () => {
    const user = {
      email: 'nuralirajab03@gmail.com',
      password: '12345678',
    }
    const check = await request(app)
      .post('/api/v1/auth/member/login')
      .send(user)
    const res = JSON.parse(check.text)
    const token = res.data.token
    console.log(token)
    const userUpdate = {
      name: 'Rajab',
      phoneNumber: '085327436534',
      country: 'Malaisya',
      city: 'Johor',
    }
    const response = await request(app)
      .patch('/api/v1/user/update/2')
      .set(`Authorization`, `Bearer ${token}`)
      .send(userUpdate)
    expect(response.statusCode).toBe(200)
  })

  it('success update data car', async () => {
    const user = {
      email: 'nuralirajab03@gmail.com',
      password: '12345678',
    }
    const check = await request(app)
      .post('/api/v1/auth/member/login')
      .send(user)
    const res = JSON.parse(check.text)
    const token = res.data.token
    console.log(token)
    const userUpdate = {
      name: 'Rajab',
      phoneNumber: '085327436534',
      country: 'Malaisya',
      city: 'Johor',
    }
    const response = await request(app)
      .patch('/api/v1/user/update/3')
      .set(`Authorization`, `Bearer ${token}`)
      .send(userUpdate)
    expect(response.statusCode).toBe(404)
    expect(response.body.message).toBe('Pengguna tidak ditemukan')
  })
})
