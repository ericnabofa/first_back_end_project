const express = require('express');
const { getAllTopics } = require('./app.controller');
const { handleServerErrors} = require('../errors');

const app = express();

app.get('/api/topics', getAllTopics)


app.use(handleServerErrors)

module.exports = app;
