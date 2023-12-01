const express = require('express');
const { getAllTopics, getAllArticles, getApiEndpoints, getArticleByid, getAllArticleComments, postCommentByArticleId, updateArticle, deleteCommentByCommentId } = require('./app.controller');
const { handleServerErrors, handleCustomErrors, handlePsqlErrors} = require('../errors');


const app = express();
app.use(express.json())




app.get('/api/topics', getAllTopics)
app.get('/api/articles', getAllArticles)
app.get('/api/articles/:article_id', getArticleByid)
app.get('/api', getApiEndpoints)
app.get('/api/articles/:article_id/comments', getAllArticleComments)
app.post('/api/articles/:article_id/comments', postCommentByArticleId)
app.delete('/api/comments/:comment_id', deleteCommentByCommentId)
app.patch('/api/articles/:article_id', updateArticle)

app.use(handlePsqlErrors)
app.use(handleCustomErrors)
app.use(handleServerErrors)

module.exports = app;
