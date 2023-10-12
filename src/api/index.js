const express = require('express');
const bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express');

const config = require('../../config');
const answer = require('./components/answer/network.js');
const petition = require('./components/petition/network.js');
const errors = require('../tools/network/errors');

const app = express();

app.use(bodyParser.json());

// ROUTER
const swaggerDoc = require('./swagger.json');

app.use('/api/answer', answer);
app.use('/api/petition', petition);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Debe ser el ultimo
app.use(errors);

app.listen(config.msPetiotionsUA.port, () => {
    console.log('Api escuchando en el puerto ', config.msPetiotionsUA.port);
});