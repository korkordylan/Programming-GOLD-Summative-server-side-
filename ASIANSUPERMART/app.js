const express = require('express');
const app = express();
const orders = require('./orders.json');
app.use(express.static('index'));
app.use(express.json());

app.get('/products', function (req, resp) {
  const products = require('./products.json');
  resp.json(products);
});

app.post('/new', function (req, resp) {
  const order = req.body;
  orders.push(order);
  console.log(orders);
  resp.json(orders);
});

app.get('/order', function (req, resp) {
  const orders = require('./orders.json');
  console.log(orders);
  resp.json(orders);
});

module.exports = app;
