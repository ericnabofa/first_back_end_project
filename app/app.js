const express = require('express');
const { getAllTopics, getArticleByid } = require('./app.controller');
const { handleServerErrors, handleCustomErrors, handlePsqlErrors} = require('../errors');

const app = express();

app.get('/api/topics', getAllTopics)
app.get('/api/articles/:article_id', getArticleByid)


app.use(handlePsqlErrors)
app.use(handleCustomErrors)
app.use(handleServerErrors)

module.exports = app;
