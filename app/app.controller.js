const { selectTopics, selectArticles } = require("./app.model")


exports.getAllTopics = (req, res, next) => {
selectTopics().then((topics) => {
res.status(200).send({ topics})
})
.catch(next)
}

exports.getAllArticles = (req, res, next) => {
    selectArticles().then((processedArticles)=> {
        res.status(200).send({articles: processedArticles})
    })
    .catch(next)
}