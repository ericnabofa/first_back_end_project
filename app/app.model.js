const db = require('../db/connection')

exports.selectTopics = () => {
return db.query(`SELECT * FROM topics`)
.then((results) => {
    return results.rows;
})
}


// Ticket 5_Get-Articles
function getEveryArticles() {
    return db.query('SELECT * FROM articles ORDER BY created_at DESC')
        .then(({ rows }) => {
            return rows;
        });
}

function getCommentCount(articleId) {
    return db.query('SELECT COUNT(*) AS comment_count FROM comments WHERE article_id = $1', [articleId])
        .then(({rows}) => {
            return rows[0].comment_count}
            );
}

exports.selectArticles = () => {
    return getEveryArticles()
        .then((articles) => {
            const processedArticlesPromises = articles.map((article) => {
                return getCommentCount(article.article_id)
        .then((comment_count) => {
            const { body, ...articleWithoutBody } = article;
                return { ...articleWithoutBody, comment_count };
                    });
            });
            return Promise.all(processedArticlesPromises);
        });
};
