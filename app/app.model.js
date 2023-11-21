const db = require('../db/connection')
const endpoints = require('../endpoints.json')

exports.selectTopics = () => {
return db.query(`SELECT * FROM topics`)
.then((results) => {
    return results.rows;
})
}

exports.selectApiEndpoints = () => {
    const documentation = {};
    const endpointsPromises = Object.entries(endpoints).map(([endpoint, data]) => {
      documentation[endpoint] = {
        description: data.description,
        queries: data.queries,
        exampleResponse: data.exampleResponse
      };
  
      // Check if a database query is specified for the current endpoint
      if (data.query_database) {
        return db.query(data.query_database)
          .then(({ rows }) => {
            documentation[endpoint].exampleResponse = rows[0];
          })
      } else {
        // If no database query is specified, return a resolved promise
        return Promise.resolve();
      }
    });
  
    // Wait for all promises to resolve before returning documentation
    return Promise.all(endpointsPromises)
      .then(() => {
        return documentation;
      })
  };
  