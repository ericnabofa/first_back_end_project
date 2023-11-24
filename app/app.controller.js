const { selectTopics, selectArticles, selectArticleById, insertCommentByArticle_Id } = require("./app.model")
const endpoints = require('../endpoints.json')


exports.getAllTopics = (req, res, next) => {
selectTopics().then((topics) => {
res.status(200).send({ topics})
})
.catch(next)
}

exports.getAllArticles = (req, res, next) => {
    selectArticles().then((articles)=> {
        res.status(200).send({articles})
    })
    .catch(next)
}

exports.getArticleByid = (req, res, next) => {
    const {article_id} = req.params
    selectArticleById(article_id).then((article) => {
        res.status(200).send({article})
    })
    .catch(next)
}

exports.getApiEndpoints = (req, res, next) => {
    if (endpoints){
        res.status(200).json(endpoints)
    } else {
        next(err)
    }
}

exports.postCommentByArticleId = (req, res, next) => {
    const {article_id} = req.params;
    const {username, body} = req.body;
    insertCommentByArticle_Id(article_id, username, body).then((comment) => {
        res.status(201).send({comment})
    })
    .catch(next)
}