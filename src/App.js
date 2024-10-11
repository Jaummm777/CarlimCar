const express = require('express');
const carRoutes = require('./routes/carRoutes');

const app = express();

app.use(express.json());
app.use('/carros', carRoutes);

module.exports = app;
