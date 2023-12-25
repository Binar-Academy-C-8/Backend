/* eslint-disable no-undef */
const request = require('supertest');
const dotenv = require('dotenv');
const app = require('../app/index');

dotenv.config();
const { Auth } = require('../app/models');

describe('API create transaction', () => {
  it('success create transaction', async () => {
    jest.spyOn(Auth, 'findOne').mockResolvedValue({
      status: 'Success',
      message: 'Login berhasil',
      data: {
        token: 'mocked_token',
      },
    });

    const courseId = 4;
    await request(app)
      .post(`/api/v1/transaction/${courseId}`)
      .set('Authorization', 'Bearer mocked_token')
      .send({});

    jest.restoreAllMocks();
  });

  it('Failed create transaction, order Id not found', async () => {
    const loginCredentials = {
      email: 'memberc8@mail.com',
      password: 'admin1234',
    };

    const loginResponse = await request(app)
      .post('/api/v1/auth/member/login')
      .send(loginCredentials);

    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.body.status).toBe('Success');
    expect(loginResponse.body.message).toBe('Login berhasil');

    const userToken = loginResponse.body.data.token;

    const invalidCourseId = 9999;

    const responseTransaction = await request(app)
      .post(`/api/v1/transaction/${invalidCourseId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({});

    expect(responseTransaction.statusCode).toBe(404);
    expect(responseTransaction.body.status).toBe('Failed');
    expect(responseTransaction.body.message).toBe(
      `Kursus dengan ID: ${invalidCourseId} tidak ditemukan`,
    );
    jest.restoreAllMocks();
  });

  it('Failed create transaction, unpaid transaction exists', async () => {
    const loginCredentials = {
      email: 'memberc8@mail.com',
      password: 'admin1234',
    };

    const loginResponse = await request(app)
      .post('/api/v1/auth/member/login')
      .send(loginCredentials);

    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.body.status).toBe('Success');
    expect(loginResponse.body.message).toBe('Login berhasil');

    const userToken = loginResponse.body.data.token;

    const courseId = 4;

    const responseTransaction = await request(app)
      .post(`/api/v1/transaction/${courseId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({});

    expect(responseTransaction.statusCode).toBe(409);
    expect(responseTransaction.body.status).toBe('Failed');
    expect(responseTransaction.body.message).toBe(
      'Anda memiliki transaksi yang belum dibayar untuk kursus ini, silahkan cek riwayat transaksi',
    );
    jest.restoreAllMocks();
  });
});

describe('API admin get data transaction', () => {
  it('success get data transaction', async () => {
    const user = {
      email: 'adminc8@mail.com',
      password: 'admin1234',
    };
    const response = await request(app)
      .post('/api/v1/auth/admin/login')
      .send(user);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('Success');
    expect(response.body.message).toBe('Berhasil login');
    const userToken = response.body;

    const responseData = await request(app)
      .get('/api/v1/transaction')
      .set('Authorization', `Bearer ${userToken.data}`);

    expect(responseData.statusCode).toBe(200);
    expect(responseData.body.status).toBe('Success');
  });
});

describe('API get payment detail', () => {
  it('success get payment detail', async () => {
    const loginCredentials = {
      email: 'memberc8@mail.com',
      password: 'admin1234',
    };

    const loginResponse = await request(app)
      .post('/api/v1/auth/member/login')
      .send(loginCredentials);

    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.body.status).toBe('Success');
    expect(loginResponse.body.message).toBe('Login berhasil');

    const { token } = loginResponse.body.data;
    const courseId = 5;
    const responseTransaction = await request(app)
      .post(`/api/v1/transaction/${courseId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(responseTransaction.statusCode).toBe(201);
    expect(responseTransaction.body.status).toBe('Success');

    const { orderId } = responseTransaction.body.createdTransactionData;

    const responseDataCourse = await request(app)
      .get(`/api/v1/transaction/${orderId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(responseDataCourse.statusCode).toBe(200);
    expect(responseDataCourse.body.status).toBe('Success');
  });
});

describe('API get payment callback', () => {
  it('success get ', async () => {
    const loginCredentials = {
      email: 'memberc8@mail.com',
      password: 'admin1234',
    };

    const loginResponse = await request(app)
      .post('/api/v1/auth/member/login')
      .send(loginCredentials);

    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.body.status).toBe('Success');
    expect(loginResponse.body.message).toBe('Login berhasil');

    const userToken = loginResponse.body.data.token;
    const responseTransaction = await request(app)
      .post('/api/v1/transaction/payment-callback')
      .set('Authorization', `Bearer ${userToken}`);

    expect(responseTransaction.statusCode).toBe(200);
    expect(responseTransaction.body.message).toBe('Success');
  });
});

describe('API history transaction', () => {
  it('success get history transaction', async () => {
    const memberCredentials = {
      email: 'memberc8@mail.com',
      password: 'admin1234',
    };
    const loginResponse = await request(app)
      .post('/api/v1/auth/member/login')
      .send(memberCredentials);

    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.body.status).toBe('Success');
    expect(loginResponse.body.message).toBe('Login berhasil');
    const { token } = loginResponse.body.data;

    const responseData = await request(app)
      .get('/api/v1/transaction/history')
      .set('Authorization', `Bearer ${token}`);

    expect(responseData.statusCode).toBe(200);
    expect(responseData.body.status).toBe('Success');
  });

  it('fails when user transaction history is empty', async () => {
    const user = {
      email: 'adminc8@mail.com',
      password: 'admin1234',
    };

    const loginResponse = await request(app)
      .post('/api/v1/auth/member/login')
      .send(user);

    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.body.status).toBe('Success');
    expect(loginResponse.body.message).toBe('Login berhasil');
    const { token } = loginResponse.body.data;

    const responseData = await request(app)
      .get('/api/v1/transaction/history')
      .set('Authorization', `Bearer ${token}`);

    expect(responseData.statusCode).toBe(404);
    expect(responseData.body.status).toBe('Failed');
    expect(responseData.body.message).toBe('Data transaksi kosong');
  });
});
