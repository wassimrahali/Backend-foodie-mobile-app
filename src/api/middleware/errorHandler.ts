/* eslint-disable @typescript-eslint/no-unused-vars */
function errorHandler(err, req, res, next) {
    console.log("error ")
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500
    res.status(statusCode)
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
    })
}

export default errorHandler
