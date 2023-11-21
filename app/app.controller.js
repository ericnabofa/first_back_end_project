const { selectTopics, selectApiEndpoints } = require("./app.model")


exports.getAllTopics = (req, res, next) => {
selectTopics().then((topics) => {
res.status(200).send({ topics})
})
.catch(next)
}

exports.getApiEndpoints = (req, res, next) => {
selectApiEndpoints().then((body) => {
res.status(200).json(body)
})
.catch(next)
}