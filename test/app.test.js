const supertest = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe('GET /app', () => {
  it('should return an array of apps', () => {
    return supertest(app)
      .get('/app')
      .expect(200)
      .expect('Content-Type', /json/);
  })
});