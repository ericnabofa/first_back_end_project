const express = require('express');
const { getAllTopics, getAllArticles, getApiEndpoints, getArticleByid, postCommentByArticleId } = require('./app.controller');
const { handleServerErrors, handleCustomErrors, handlePsqlErrors} = require('../errors');


const app = express();
app.use(express.json())




app.get('/api/topics', getAllTopics)
app.get('/api/articles', getAllArticles)
app.get('/api/articles/:article_id', getArticleByid)
app.get('/api', getApiEndpoints)
app.post('/api/articles/:article_id/comments', postCommentByArticleId)



app.use(handlePsqlErrors)
app.use(handleCustomErrors)
app.use(handleServerErrors)

module.exports = app;
