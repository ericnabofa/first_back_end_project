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
