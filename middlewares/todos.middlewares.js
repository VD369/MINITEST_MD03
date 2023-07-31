let isAdmin = true
module.exports = {
    checkAdmin: function (req, res, next) {
        if (!isAdmin) {
            return res.status(500).json({
                message: "Ban can co quyen admin "
            })
        }
        next()
    }
}