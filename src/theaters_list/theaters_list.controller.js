const theatersListService = require('./theaters_list.service')
const asyncErrorBoundary = require('../errors/asyncErrorBoundary')


async function list(req, res) {
    const data = await theatersListService.list()
    res.send({ data })
}

module.exports = {
    list: asyncErrorBoundary(list)
}
