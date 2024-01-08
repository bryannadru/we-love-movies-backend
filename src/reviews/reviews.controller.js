const reviewsService = require('./reviews.service')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')

// done just need to debug/review 

// id doesn't match validation 
async function reviewExists(req, res, next) {
    const { reviewId } = req.params
    let review = await reviewsService.read(reviewId)
    if (review) {
        res.locals.review = review
        return next()
    }
    return next({ status: 404, message: 'Review cannot be found'})
}


async function read(req, res, next) {
    const { reviewId } = req.params
    const data = await reviewsService.read(reviewId)
    res.json({data})
}


async function update(req, res) {
   const updatedReview = { ...res.locals.review, ...req.body.data };
  await reviewsService.update(updatedReview);
  const reviewToReturn = await reviewsService.reviewWithCritic(
    res.locals.review.review_id
  );
  res.json({ data: reviewToReturn });
  }
  
// destroy validation 
async function destroy(req, res) {
    await reviewsService.destroy(res.locals.review.review_id)
    res.sendStatus(204)
}


async function list(req, res) {
    const { reviewId }  = req.params
    const data = await reviewsService.list(reviewId)
    res.json({ data })
}

module.exports = {
    update: [
        asyncErrorBoundary(reviewExists),
        asyncErrorBoundary(update)
    ],
    delete: [
        asyncErrorBoundary(reviewExists),
        asyncErrorBoundary(destroy),
    ]
}