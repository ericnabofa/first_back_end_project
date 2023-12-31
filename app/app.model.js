const db = require('../db/connection');


exports.selectTopics = () => {
return db.query(`SELECT * FROM topics`)
.then(({rows}) => {
    return rows;
})
}


// Ticket 5_Get-Articles

exports.selectArticles = (topic) => {
        let query = 
        `
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
            comments c ON a.article_id = c.article_id`;

            if (topic !== undefined) {
                query += ' WHERE a.topic = $1';
            }

            query += `
            GROUP BY 
            a.article_id, a.author, a.title, a.topic, a.created_at, a.votes, a.article_img_url
        ORDER BY 
            a.created_at DESC;
            `

            const queryParams = topic !== undefined ? [topic] : []

            return db.query(query, queryParams)
            .then(({ rows }) => {
                if (rows.length === 0) {
                return Promise.reject({ status: 404, msg: 'article does not exist' });
                }
            return rows;
        });
};


exports.selectArticleById = (article_id, includeCommentCount = false) => {
    let query = `
        SELECT 
            a.article_id,
            a.author,
            a.title,
            a.body,
            a.topic,
            a.created_at,
            a.votes,
            a.article_img_url`;

    if (includeCommentCount) {
        query += `,
            COUNT(c.comment_id) AS comment_count`;
    }

    query += `
        FROM 
            articles a`;

    if (includeCommentCount) {
        query += `
            LEFT JOIN 
                comments c ON a.article_id = c.article_id`;
    }

    query += `
        WHERE 
            a.article_id = $1`;

    if (includeCommentCount) {
        query += `
        GROUP BY 
            a.article_id, a.author, a.title, a.body, a.topic, a.created_at, a.votes, a.article_img_url`;
    }

    return db.query(query, [article_id])
    .then(({rows}) => {
        if(!rows.length){
            return Promise.reject({status: 404, msg: 'does not exist'})
        }
        return rows[0]
    })
}

  
exports.selectCommentsByArticleId = (article_id) => {
return db.query(`SELECT
c.comment_id,
c.votes,
c.created_at,
c.author,
c.body,
c.article_id
FROM
comments c
WHERE
c.article_id = $1
ORDER BY 
c.created_at DESC
`, [article_id])
.then(({rows}) => {
    return rows 
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
        return rows[0]
    })
}


exports.selectUsers = () => {
    return db.query(`SELECT * FROM users`)
    .then(({rows}) => {
        return rows;
    })
}

exports.removeCommentByComment_Id = (comment_id) => {
    return db.query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`, [comment_id])
    .then(({rows}) => {
        if(!rows.length){
            return Promise.reject({status: 404, msg: 'does not exist'})
        }
      return rows[0]
    })
}


exports.patchArticle = (inc_votes, article_id) => {
    const queryString = `UPDATE articles 
    SET votes = votes + $1 WHERE article_id = $2 
    RETURNING *`

    const queryValues = [inc_votes, article_id]

    return db.query(queryString, queryValues)
    .then(({rows}) => {
        if(!rows.length){
            return Promise.reject({status: 404, msg: 'article does not exist'})
        }
        return rows[0]
    })
}
