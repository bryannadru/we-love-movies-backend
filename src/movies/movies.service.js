const knex = require('../db/connection')
const mapProperties = require('../utils/map-properties')

// done just need to debug 
function addCritic(movies) {
    return movies.map((movie) => {
        return {
            'review_id': movie.review_id,
            'content': movie.content,
            'score': movie.score,
            'created_at': movie.created_at,
            'updated_at': movie.updated_at,
            'critic_id': movie.critic_id,
            'movie_id': movie.movie_id,
            'critic': {
                'critic_id': movie.c_critic_id,
                'preferred_name': movie.preferred_name,
                'surname': movie.surname,
                'organization_name': movie.organization_name,
                'created_at': movie.c_created_at,
                'updated_at': movie.c_updated_at
            }
        }
    })
}

function list() {
    return knex('movies').select('*')
}

function listShowings() {
    return knex('movies as m')
    .join('movies_theaters as mt', 'mt.movie_id', 'm.movie_id')
    .select('m.*')
    .where({ 'mt.is_showing': true })
    .groupBy('m.movie_id')
}


function listTheaters(movieId) {
    return knex('movies_theaters as mt') 
    .join('theaters as t', 't.theater_id', 'mt.theater_id')
    .select('t.*')
    .where({ 'mt.movie_id': movieId})
}
// don't know if this is right thing to return 


function listReviews(movieId) {
    return knex('reviews as r') 
    .join('movies as m', 'r.movie_id', 'm.movie_id')
    .join('critics as c', 'c.critic_id', 'r.critic_id')
    .select('*')
    .where({ 'r.movie_id': movieId })
    .then(addCritic)
}

function read(movieId) {
    return knex('movies')
    .select('*')
    .where({ movie_id: movieId })
    .first()
}




module.exports = {
    list, 
    listShowings,
    listTheaters,
    listReviews,
    read,
}
