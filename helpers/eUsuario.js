module.exports = {
    eUsuario: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash("error_msg", "Você não tem permissão de acesso.")
        res.redirect("/")
    }
}