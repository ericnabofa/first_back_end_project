const express = require('express');
const { getAllTopics, getAllArticles } = require('./app.controller');
const { handleServerErrors} = require('../errors');

const app = express();

app.get('/api/topics', getAllTopics)
app.get('/api/articles', getAllArticles)
app.use(handleServerErrors)

module.exports = app;
