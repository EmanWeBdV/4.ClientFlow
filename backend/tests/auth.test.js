process.env.JWT_SECRET = 'test_secret';

const request = require('supertest');
const bcrypt = require('bcryptjs');
const app = require('../src/app');
const User = require('../src/models/User');

jest.mock('../src/models/User');

describe('Auth API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('registra un nuovo utente', async () => {
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({
      _id: 'user123',
      name: 'Mario Rossi',
      email: 'mario@test.it'
    });

    const response = await request(app).post('/api/auth/register').send({
      name: 'Mario Rossi',
      email: 'mario@test.it',
      password: 'password123'
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.token).toBeDefined();
    expect(response.body.user.email).toBe('mario@test.it');
  });

  test('fa login con credenziali corrette', async () => {
    const hashedPassword = await bcrypt.hash('password123', 10);
    User.findOne.mockResolvedValue({
      _id: 'user123',
      name: 'Mario Rossi',
      email: 'mario@test.it',
      password: hashedPassword
    });

    const response = await request(app).post('/api/auth/login').send({
      email: 'mario@test.it',
      password: 'password123'
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
    expect(response.body.user.name).toBe('Mario Rossi');
  });

  test('blocca login con password errata', async () => {
    const hashedPassword = await bcrypt.hash('password123', 10);
    User.findOne.mockResolvedValue({
      _id: 'user123',
      name: 'Mario Rossi',
      email: 'mario@test.it',
      password: hashedPassword
    });

    const response = await request(app).post('/api/auth/login').send({
      email: 'mario@test.it',
      password: 'sbagliata'
    });

    expect(response.statusCode).toBe(401);
  });
});
