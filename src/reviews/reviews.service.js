const knex = require('../db/connection')
const mapProperties = require('../utils/map-properties')

// done need to debug and review

const addCritic = mapProperties({
    preferred_name: 'critic.preferred_name',
    surname: 'critic.surname',
    organization_name: 'critic.organization_name'
})


/*async function readCritic(critic_id) {
    return knex('critics')
    .where({ critic_id })
    .first()
}
*/

/*async function foundCritic(critic_id) {
    review.critic = await readCritic(review.critic_id)
    return review
}*/

function read(reviewId) {
    return knex('reviews')
    .select('*')
    .where({ review_id: reviewId})
    .first()
}


function update(updatedReview) {
    return knex ('reviews')
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview);
}

function reviewWithCritic(reviewId) {
    return knex('reviews as r')
    .join('critics as c', 'c.critic_id', 'r.critic_id')
    .select('*')
    .where({ 'r.review_id' : reviewId })
    .first()
    .then((result => {
        const updatedReview = addCritic(result);
        return updatedReview;
    }))
}


function destroy(reviewId) {
    return knex('reviews')
    .where({ review_id: reviewId })
    .del()
}

/* async function list(movie_id) {
    const reviews = await knex("reviews").where({ movie_id });
    return await Promise.all(reviews.map(foundCritic));
    // promise.all used to wait until all promises resolve before list function returns 
} */

module.exports = {
    update,
    reviewWithCritic,
    read,
    destroy,
}

