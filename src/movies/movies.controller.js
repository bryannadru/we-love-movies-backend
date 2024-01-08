const asyncErrorBoundary = require('../errors/asyncErrorBoundary')
const moviesService = require('./movies.service')

async function movieExists(req, res, next) {
    const { movieId } = req.params
    const movie = await moviesService.read(movieId)
    if (movie) {
        res.locals.movie = movie
        return next()
    } next ({
        status: 404,
        message: 'Movie cannot be found'
    })
} 

async function list(req, res, next) {
    let data = await moviesService.list()

    const isShowing = req.query.is_showing
    if (isShowing) {
      res.json({ data: await moviesService.listShowings() })
    } else {
        res.json({ data: await moviesService.list() })
    }
}

async function read(req, res, next) {
    res.json({ data : res.locals.movie })
}

/*async function listShowings(req, res, next) {
    const data = await moviesService.listShowings(movieId)
    res.json({ data })
} */


async function listTheaters(req, res, next) {
    const { movieId } = req.params
    const data = await moviesService.listTheaters(movieId)
    res.json({ data })
}

async function listReviews(req, res, next) {
    const { movieId } = req.params
    res.json({ data : await moviesService.listReviews(movieId) })
}


module.exports = {
    list: [asyncErrorBoundary(list)],
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
    listTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listTheaters)],
    listReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listReviews)]
}