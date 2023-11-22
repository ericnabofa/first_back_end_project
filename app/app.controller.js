const { selectTopics, selectApiEndpoints } = require("./app.model")
const endpoints = require('../endpoints.json')


exports.getAllTopics = (req, res, next) => {
selectTopics().then((topics) => {
res.status(200).send({ topics})
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