exports.isAdmin = (req, res, next) => {
    if (req.user.role === "admin") {
        next()

    } else {
        return res.status(403).json({
            error: "user is not  Allowed for that Specific Route"
        })
    }
}