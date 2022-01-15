const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const index = require('./routes/index');
const insurance = require('./routes/insurance');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// routes
app.use('/', index);
app.use('/insurance', insurance);

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Insurance App',
      version: '1.0.0',
    },
  },
  apis: ['./src/routes/*.js'],
});
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
