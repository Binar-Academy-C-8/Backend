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
    const userEmail = 'nirwan@gmail.com'
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
  it('success update data user', async () => {
    const user = {
      email: 'nuralirajab03@gmail.com',
      password: '12345678',
    }
    const login = await request(app)
      .post('/api/v1/auth/member/login')
      .send(user)
    const token = login.body.data.token
    const id = login.body.data.id
    console.log(token)
    const userUpdate = {
      name: 'Rajab',
      phoneNumber: '085327436534',
      country: 'Malaisya',
      city: 'Johor',
    }
    const response = await request(app)
      .patch(`/api/v1/user/update/${id}`)
      .set(`Authorization`, `Bearer ${token}`)
      .send(userUpdate)
    console.log(response)
    expect(response.statusCode).toBe(200)
  })

  // it('failed update data user because user not found', async () => {
  //   const user = {
  //     email: 'nuralirajab03@gmail.com',
  //     password: '12345678',
  //   }
  //   const login = await request(app)
  //     .post('/api/v1/auth/member/login')
  //     .send(user)
  //   const token = login.body.data.token
  //   console.log(token)
  //   const userUpdate = {
  //     name: 'Rajab',
  //     phoneNumber: '085327436534',
  //     country: 'Malaisya',
  //     city: 'Johor',
  //   }
  //   const response = await request(app)
  //     .patch('/api/v1/user/update/77777')
  //     .set(`Authorization`, `Bearer ${token}`)
  //     .send(userUpdate)
  //   expect(response.statusCode).toBe(404)
  //   expect(response.body.message).toBe('Pengguna tidak ditemukan')
  // })
})

describe('API delete user', () => {
  it('success delete data user', async () => {
    const admin = {
      email: 'adminc8@mail.com',
      password: 'admin123',
    }
    const check = await request(app)
      .post('/api/v1/auth/admin/login')
      .send(admin)
    const res = JSON.parse(check.text)
    const token = res.data
    console.log(token)
    const response = await request(app)
      .delete('/api/v1/user/delete/7')
      .set(`Authorization`, `Bearer ${token}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe('Berhasil dihapus')
  })

  it('failed delete user because id not found', async () => {
    const admin = {
      email: 'adminc8@mail.com',
      password: 'admin123',
    }
    const check = await request(app)
      .post('/api/v1/auth/admin/login')
      .send(admin)
    const res = JSON.parse(check.text)
    const token = res.data
    console.log(token)
    const response = await request(app)
      .delete('/api/v1/user/delete/2')
      .set(`Authorization`, `Bearer ${token}`)
    expect(response.statusCode).toBe(404)
    expect(response.body.message).toBe('Pengguna dengan Id ini tidak ditemukan')
  })
})
