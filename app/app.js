const express = require('express');

const cors = require('cors')

const { getAllTopics, getAllArticles, getApiEndpoints, getArticleByid, getAllArticleComments, postCommentByArticleId, updateArticle, deleteCommentByCommentId, getAllUsers } = require('./app.controller');
const { handleServerErrors, handleCustomErrors, handlePsqlErrors} = require('../errors');




const app = express();
app.use(cors())
app.use(express.json())




app.get('/api/topics', getAllTopics)
app.get('/api/articles', getAllArticles)
app.get('/api/articles/:article_id', getArticleByid)
app.get('/api', getApiEndpoints)
app.get('/api/articles/:article_id/comments', getAllArticleComments)
app.post('/api/articles/:article_id/comments', postCommentByArticleId)
app.get('/api/users', getAllUsers)
app.delete('/api/comments/:comment_id', deleteCommentByCommentId)
app.patch('/api/articles/:article_id', updateArticle)


app.use(handlePsqlErrors)
app.use(handleCustomErrors)
app.use(handleServerErrors)

module.exports = app;
