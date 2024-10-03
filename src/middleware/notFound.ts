// eslint-disable-next-line @typescript-eslint/no-unused-vars
function notFound(req, res, next) {
    res.status(404)
    res.json({
        message: "not found",
    })
}

export default notFound
