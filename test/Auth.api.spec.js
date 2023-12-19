/* eslint-disable */
const request = require('supertest')
const app = require('../app/index')
const { faker } = require('@faker-js/faker')
require('dotenv').config()

describe('API Register', () => {
  it('success register', async () => {
    const user = {
      email: 'abwdhaaw03@gmail.com',
      password: '12345678',
      name: 'nirwan',
      phoneNumber: '01234567',
      country: 'Indonesia',
      city: 'Tangerang',
    }
    const response = await request(app)
      .post('/api/v1/auth/member/register')
      .send(user)
    expect(response.statusCode).toBe(201)
    expect(response.body.status).toBe('Registrasi berhasil')
  })

  it('Failed register because user password minimum not match', async () => {
    const user = {
      email: 'member02@gmail.com',
      password: '123',
      name: 'nirwan',
      phoneNumber: '01234567',
      country: 'Indonesia',
      city: 'Tangerang',
    }
    const response = await request(app)
      .post('/api/v1/auth/member/register')
      .send(user)
    expect(response.statusCode).toBe(400)
    expect(response.body.message).toBe(
      'Panjang kata sandi minimal harus 8 karakter'
    )
  })

  it('Failed register because email already exist', async () => {
    const user = {
      email: 'nirwan.arrach@gmail.com',
      password: '12345678',
      name: 'nirwan',
      phoneNumber: '01234567',
      country: 'Indonesia',
      city: 'Tangerang',
    }
    const response = await request(app)
      .post('/api/v1/auth/member/register')
      .send(user)
    expect(response.statusCode).toBe(400)
    expect(response.body.message).toBe('Email pengguna sudah digunakan')
  })

  it('Failed register because email is invalid', async () => {
    const user = {
      email: 'nirwan.arrachgmail.com',
      password: '12345678',
      name: 'nirwan',
      phoneNumber: '01234567',
      country: 'Indonesia',
      city: 'Tangerang',
    }
    const response = await request(app)
      .post('/api/v1/auth/member/register')
      .send(user)
    expect(response.statusCode).toBe(400)
    expect(response.body.message).toBe('Alamat email tidak valid.')
  })
})

describe('API Login Member', () => {
  it('success login', async () => {
    const user = {
      email: 'nuralirajab03@gmail.com',
      password: '12345678',
    }
    const response = await request(app)
      .post('/api/v1/auth/member/login')
      .send(user)
    expect(response.statusCode).toBe(200)
    expect(response.body.status).toBe('Success')
    expect(response.body.message).toBe('Login berhasil')
  })

  it('Failed login because user not verified', async () => {
    const user = {
      email: 'nirwan.arrach@gmail.com',
      password: '12345678',
    }
    const response = await request(app)
      .post('/api/v1/auth/member/login')
      .send(user)
    expect(response.statusCode).toBe(401)
    expect(response.body.status).toBe('Failed')
    expect(response.body.message).toBe('Pengguna belum diverifikasi')
  })

  it('Failed login because email not found', async () => {
    const user = {
      email: 'zzz@gmail.com',
      password: '123456789',
    }
    const response = await request(app)
      .post('/api/v1/auth/member/login')
      .send(user)
    expect(response.statusCode).toBe(404)
    expect(response.body.status).toBe('Failed')
    expect(response.body.message).toBe('Email tidak ditemukan')
  })

  it('Failed login because wrong password', async () => {
    const user = {
      email: 'nirwan@gmail.com',
      password: 'salahpassword',
    }
    const response = await request(app)
      .post('/api/v1/auth/member/login')
      .send(user)

    expect(response.statusCode).toBe(401)
    expect(response.body.status).toBe('Failed')
    expect(response.body.message).toBe('Kata sandi salah')
  })
})

describe('API Login Admin', () => {
  it('success login', async () => {
    const user = {
      email: 'adminc8@mail.com',
      password: 'admin123',
    }
    const response = await request(app)
      .post('/api/v1/auth/admin/login')
      .send(user)
    expect(response.statusCode).toBe(200)
    expect(response.body.status).toBe('Success')
    expect(response.body.message).toBe('Berhasil login')
  })

  it('Failed login because user is not an admin', async () => {
    const user = {
      email: 'nuralirajab03@gmail.com',
      password: '12345678',
    }
    const response = await request(app)
      .post('/api/v1/auth/admin/login')
      .send(user)

    expect(response.statusCode).toBe(401)
    expect(response.body.status).toBe('Failed')
    expect(response.body.message).toBe('Hanya admin yang dapat login')
  })

  it('Failed login because email not found', async () => {
    const user = {
      email: 'zzz@gmail.com',
      password: '123456789',
    }
    const response = await request(app)
      .post('/api/v1/auth/admin/login')
      .send(user)
    expect(response.statusCode).toBe(404)
    expect(response.body.status).toBe('Failed')
    expect(response.body.message).toBe('Email tidak ditemukan')
  })

  it('Failed login because wrong password', async () => {
    const user = {
      email: 'adminc8@mail.com',
      password: 'salahpassword',
    }
    const response = await request(app)
      .post('/api/v1/auth/admin/login')
      .send(user)

    expect(response.statusCode).toBe(401)
    expect(response.body.status).toBe('Failed')
    expect(response.body.message).toBe('Kata sandi salah')
  })
})

describe('API Auth Me', () => {
  it('success get profile by token', async () => {
    const user = {
      email: 'nuralirajab03@gmail.com',
      password: '12345678',
    }
    const response = await request(app)
      .post('/api/v1/auth/member/login')
      .send(user)
    const userToken = response.body
    expect(response.statusCode).toBe(200)
    expect(response.body.status).toBe('Success')
    expect(response.body.message).toBe('Login berhasil')

    const responseAuthMe = await request(app)
      .get('/api/v1/auth/me')
      .set(`Authorization`, `Bearer ${userToken.data.token}`)
      .send(user)
    expect(responseAuthMe.statusCode).toBe(200)
    expect(responseAuthMe.body.status).toBe('Success')
  })
})

describe('API OTP verification', () => {
  it('success OTP verification', async () => {
    const user = {
      email: 'nirwan.arrach@gmail.com',
    }
    const response = await request(app).post('/api/v1/auth/new-otp').send(user)
    const userOtp = response.body
    expect(response.statusCode).toBe(200)
    expect(response.body.status).toBe('Success')
    expect(response.body.data.message).toBe('OTP berhasil terkirim')

    const responseOtp = await request(app)
      .post(`/api/v1/auth/verify-otp/${userOtp.data.newOtpRequest.userId}`)
      .send({
        code: userOtp.data.newCode,
      })
    expect(responseOtp.statusCode).toBe(200)
    expect(responseOtp.body.status).toBe('Success')
    expect(responseOtp.body.message).toBe('Verifikasi OTP berhasil')
  })

  it('failed OTP verification - expired code', async () => {
    // Simulasi pengiriman OTP
    const user = {
      email: 'nirwan@gmail.com',
    }
    const response = await request(app).post('/api/v1/auth/new-otp').send(user)
    const userOtp = response.body
    expect(response.statusCode).toBe(200)
    expect(response.body.status).toBe('Success')
    expect(response.body.data.message).toBe('OTP berhasil terkirim')

    // Coba verifikasi OTP setelah kode kedaluwarsa
    const responseOtp = await request(app)
      .post(`/api/v1/auth/verify-otp/100`)
      .send({
        code: userOtp.data.newCode,
      })
    expect(responseOtp.statusCode).toBe(401)
    expect(responseOtp.body.status).toBe('Failed')
    expect(responseOtp.body.message).toBe('Kode OTP telah kedaluwarsa')
  })

  it('failed OTP verification - invalid code', async () => {
    const user = {
      email: 'nirwan@gmail.com',
    }
    const response = await request(app).post('/api/v1/auth/new-otp').send(user)
    const userOtp = response.body
    expect(response.statusCode).toBe(200)
    expect(response.body.status).toBe('Success')
    expect(response.body.data.message).toBe('OTP berhasil terkirim')

    const responseOtp = await request(app)
      .post(`/api/v1/auth/verify-otp/${userOtp.data.newOtpRequest.userId}`)
      .send({
        code: 'invalid_code',
      })
    expect(responseOtp.statusCode).toBe(403)
    expect(responseOtp.body.status).toBe('Failed')
    expect(responseOtp.body.message).toBe('OTP tidak valid')
  })
})

describe('API update Password', () => {
  it('success update Password', async () => {
    const user = {
      password: 'admin1234',
    }
    const response = await request(app)
      .patch('/api/v1/auth/reset-password/5')
      .send(user)
    expect(response.statusCode).toBe(200)
    expect(response.body.status).toBe('Success')
    expect(response.body.message).toBe('Pembaruan Kata Sandi berhasil')
  })

  it('failed update Password due to unverified user', async () => {
    const user = {
      password: 'admin1234',
    }
    const unverifiedUserId = 3
    const response = await request(app)
      .patch(`/api/v1/auth/reset-password/${unverifiedUserId}`)
      .send(user)

    expect(response.statusCode).toBe(401)
    expect(response.body.status).toBe('Failed')
    expect(response.body.message).toBe('Pengguna belum diverifikasi')
  })
})
