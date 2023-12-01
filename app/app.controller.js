
const { selectTopics, selectArticles, selectArticleById, selectCommentsByArticleId, insertCommentByArticle_Id, patchArticle, removeCommentByComment_Id, selectUsers } = require("./app.model");
const endpoints = require('../endpoints.json')
const { checkArticleExists } = require("./app.articles.model")


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

exports.getAllArticleComments = (req, res, next) => {
    const {article_id} = req.params

    const commentPromises = [selectCommentsByArticleId(article_id)]

    if (article_id){
        commentPromises.push(checkArticleExists(article_id))
    }
    
    Promise.all(commentPromises)
    .then((resolvedPromises) => {
        const comments = resolvedPromises[0]
       res.status(200).send({comments})
    })
    .catch(next)
}

exports.postCommentByArticleId = (req, res, next) => {
    const {article_id} = req.params;
    const {username, body} = req.body;
    insertCommentByArticle_Id(article_id, username, body).then((comment) => {
        res.status(201).send({comment})
    })
    .catch(next)
}


exports.getAllUsers = (req, res, next) => {
    selectUsers().then((users) => {
    res.status(200).send({ users})
    })
    .catch(next)
}

exports.deleteCommentByCommentId = (req, res, next) => {
    const {comment_id} = req.params
    removeCommentByComment_Id(comment_id).then((deletedComment) => {
        res.status(204).send({deletedComment})
    })
  .catch(next)
}

exports.updateArticle = (req, res, next) => {
    const {article_id} = req.params
    const {inc_votes} =  req.body
    patchArticle(inc_votes, article_id).then((updatedArticle) => {
        res.status(200).send({updatedArticle})
    })
    .catch(next)
}
