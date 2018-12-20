const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../schema/user");
const isLoggedIn = require("../public/assets/isLoggedIn");

// landing page
router.get("/", (req, res) => {
	res.render("landing");
});

//================
// AUTH routes
//================

// register
router.get("/register", (req, res) => {
	if(req.isAuthenticated()) {
		res.redirect("/blogs");
	}
	else res.render("register");
});
router.post("/register", (req, res) => {
	const newUser = new User({username: req.body.username, email: req.body.email});
	User.register(newUser, req.body.password)
		.catch(err => {
			console.log(err);
			res.render("register");
		})
		.then(user => {
			passport.authenticate("local")(req, res, () => {
				res.redirect("/blogs");
			});
		});
});

// login
router.get("/login", (req, res) => {
	if(req.isAuthenticated()) {
		res.redirect("/blogs");
	}
	else res.render("login");
});
router.post("/login", passport.authenticate("local",
	{failureRedirect: "/login"}),
	(req, res) => {
		res.redirect("/blogs");
	});

//logout
router.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/blogs");
});

module.exports = router;