/* eslint-disable no-undef */
'use strick';

const request = require('supertest');
const app = require('./app');

describe('Testing GET /products', () => {
  test('GET succeeds (products)', () => {
    return request(app)
      .get('/products')
      .expect(200);
  });

  test('GET returns /products', () => {
    return request(app)
      .get('/products')
      .expect('Content-type', /json/);
  });

  test('GET succeeds(orders)', () => {
    return request(app)
      .get('/order')
      .expect(200);
  });

  test('GET returns /orders', () => {
    return request(app)
      .get('/order')
      .expect('Content-type', /json/);
  });

  test('post', () => {
    const example = [[
      { name: 'Haitai', quantity: '3' },
      { name: 'Jinro', quantity: '2' }
    ]
    ];
    return request(app)
      .post('/new')
      .send(example)
      .expect(200);
  });

  test('post', () => {
    const example = [
      { name: 'Haitai', quantity: '3' },
      { name: 'Jinro', quantity: '2' }
    ];
    return request(app)
      .post('/new')
      .send(example)
      .expect('Content-type', /json/);
  });
});
