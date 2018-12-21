function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	req.flash("error", "Please sign in first to do that!");
	res.redirect("/login");
}

module.exports = isLoggedIn;