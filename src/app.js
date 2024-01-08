if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors')

const reviewsRouter = require('./reviews/reviews.router')
const theatersListRouter = require('./theaters_list/theaters_list.router')
const moviesRouter = require('./movies/movies.router')
const notFound = require('./errors/notFound')
const errorHandler = require('./errors/errorHandler');


app.use(cors())
app.use(express.json())

app.use('/reviews', reviewsRouter)
app.use('/theaters', theatersListRouter)
app.use('/movies', moviesRouter)

app.use(notFound)
app.use(errorHandler)




module.exports = app;
