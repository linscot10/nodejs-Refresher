const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"]
    console.log(authHeader);
co
    next()
}

module.exports = authMiddleware;
