const errorHandler = (err, req, nres, next) => {
    return res.status(500).json({msg: err})
}

module.exports = errorHandler;