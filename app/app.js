const express = require('express');
const { getAllTopics, getAllArticles, getApiEndpoints, getArticleByid, getAllArticleComments } = require('./app.controller');
const { handleServerErrors, handleCustomErrors, handlePsqlErrors} = require('../errors');


const app = express();

app.get('/api/topics', getAllTopics)
app.get('/api/articles', getAllArticles)
app.get('/api/articles/:article_id', getArticleByid)
app.get('/api', getApiEndpoints)
app.get('/api/articles/:article_id/comments', getAllArticleComments)


app.use(handlePsqlErrors)
app.use(handleCustomErrors)
app.use(handleServerErrors)

module.exports = app;
