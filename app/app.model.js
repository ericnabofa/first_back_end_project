const db = require('../db/connection')


exports.selectTopics = () => {
return db.query(`SELECT * FROM topics`)
.then(({rows}) => {
    return rows;
})
}


// Ticket 5_Get-Articles

exports.selectArticles = () => {
    return db.query(`
        SELECT 
            a.article_id,
            a.author,
            a.title,
            a.topic,
            a.created_at,
            a.votes,
            a.article_img_url,
            COUNT(c.comment_id) AS comment_count
        FROM 
            articles a
        LEFT JOIN 
            comments c ON a.article_id = c.article_id
        GROUP BY 
            a.article_id, a.author, a.title, a.topic, a.created_at, a.votes, a.article_img_url
        ORDER BY 
            a.created_at DESC
    `)
    .then(({ rows }) => {
        return rows;
    });
};
exports.selectArticleById = (article_id) => {
    return db.query(`SELECT * FROM articles WHERE article_id = $1`, [article_id])
    .then(({rows}) => {
        if(!rows.length){
            return Promise.reject({status: 404, msg: 'article does not exist'})
        }
        return rows[0]
    })
}

  
exports.insertCommentByArticle_Id = (article_id, username, body) => {

    const queryString = `
    INSERT INTO comments (article_id, body, votes, author, created_at)
    VALUES ($1, $2, 0, $3, NOW())
    RETURNING *;
    `

    const queryValues = [article_id, body, username]

    return db.query(queryString, queryValues)
    .then(({rows}) => {
        if(!rows.length){
            return Promise.reject({status: 400, msg: 'Bad Request'})
        }
        return rows[0]
    })

}
