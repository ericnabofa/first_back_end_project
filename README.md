# Northcoders News API

# Getting Started

# Prerequisites
- Node.js
- PostgreSQL
- npm

# Installation
Move into your directory 
- cd 'your_directory_name'

Clone the repository
- git clone https://github.com/ericnabofa/first_back_end_project.git

Install dependencies
- npm install


# Creating the databases
We'll have two databases in this project: one for real-looking dev data, and another for simpler test data.

You will need to create two .env files for your project: .env.test and .env.development. Into each, add PGDATABASE=, with the correct database name for that environment (see /db/setup.sql for the database names). Double check that these .env files are .gitignored.

# Production Database
Create another .env.production file and in it insert 'DATABASE_URL=your_database_url', replacing 'your_database_url' with the URL of your PostgreSQL database.

# Testing
- To run tests, use 'npm run test'

# Seeding your online database
- run ' npm run seed-prod'
Take a look at the package.json to see the script there

# API Endpoints
The API provides the following endpoints:

GET /api/articles: Get all articles
GET /api/articles/:article_id: Get an article by ID
PATCH /api/articles/:article_id: Update an article
POST /api/articles/:article_id/comments: Add a comment to an article
GET /api/articles/:article_id/comments: Get all comments for an article
DELETE /api/comments/:comment_id: Delete a comment
GET /api/topics: Get all topics
GET /api/users: Get all users

Refer to 'https://first-back-end-project.onrender.com/api' for more details on each endpoints

# Built with
Node.js
Express.js
PostgreSQL
Jest

# Contributions
Contributions are welcome! If you have any ideas for improvements or features, feel free to submit a pull request or open an issue.

# Author
Oghenevwegba Eric Nabofa

Thanks for reading.