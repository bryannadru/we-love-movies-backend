const router = require('express').Router()
const controller = require('./reviews.controller')
const methodNotAllowed = require('../errors/methodNotAllowed')

// done just need to debug and review 
router
    .route('/:reviewId')
    .put(controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed)

module.exports = router;