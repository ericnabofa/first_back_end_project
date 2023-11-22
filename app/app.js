const express = require('express');
const { getAllTopics, getApiEndpoints } = require('./app.controller');
const { handleServerErrors} = require('../errors');

const app = express();

app.get('/api/topics', getAllTopics)

app.get('/api', getApiEndpoints)


app.use(handleServerErrors)

module.exports = app;
