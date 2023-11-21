const { selectTopics, selectApiEndpoints } = require("./app.model")
const fs = require('fs')

exports.getAllTopics = (req, res, next) => {
selectTopics().then((topics) => {
res.status(200).send({ topics})
})
.catch(next)
}

exports.getApiEndpoints = (req, res, next) => {

    const endpointsFilePath =  '/Users/ericnabofa/northcoders/projects/be-nc-news/endpoints.json'
    fs.readFile(endpointsFilePath, 'utf-8', (err, data) => {
        if (err){
            return next(err)
        }
        const documentation = JSON.parse(data)
        res.status(200).json(documentation)
    })
}