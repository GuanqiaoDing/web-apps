const express = require("express");
const router = express.Router();

const Blog = require("../schema/blog");
const Comment = require("../schema/comment");
const isLoggedIn = require("../public/assets/isLoggedIn");
const checkBlogOwnership = require("../public/assets/checkBlogOwnership");

// INDEX route
router.get("/", (req, res) => {
	Blog.find({})
		.catch(err => console.log(err))
		.then(blogs => {
			res.render("blog/index", {blogs: blogs});
		})
});

// NEW route
router.get("/new", isLoggedIn, (req, res) => {
	res.render("blog/new");
});

// CREATE route
router.post("/", isLoggedIn, (req, res) => {
	Blog.create(req.body.blog)
		.catch(err => console.log(err))
		.then(newBlog => {
			newBlog.user.id = req.user._id;
			newBlog.user.username = req.user.username;
			newBlog.save();
			res.redirect("/blogs");
		});
});

// SHOW route
router.get("/:id", (req, res) => {
	Blog.findById(req.params.id).populate("comments")
		.exec((err, foundBlog) => {
			if (err) console.log(err);
			else res.render("blog/show", {blog: foundBlog});
		})
});

// EDIT route
router.get("/:id/edit", checkBlogOwnership, (req, res) => {
	Blog.findById(req.params.id)
		.catch(err => console.log(err))
		.then(foundBlog => {
			res.render("blog/edit", {blog: foundBlog});
		});
});

// UPDATE route
router.put("/:id", checkBlogOwnership, (req, res) => {
	Blog.findByIdAndUpdate(req.params.id, req.body.blog)
		.catch(err => console.log(err))
		.then(() => {
			res.redirect(`/blogs/${req.params.id}`);
		});
});

// DELETE route
router.delete("/:id", checkBlogOwnership, (req, res) => {
	Blog.findByIdAndDelete(req.params.id)
		.catch(err => console.log(err))
		.then(() => {
			res.redirect("/blogs");
		});
});

module.exports = router;