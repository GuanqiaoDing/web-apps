const express = require("express");
const router = express.Router({mergeParams: true});

const Blog = require("../schema/blog");
const Comment = require("../schema/comment");
const moment = require("moment");
const isLoggedIn = require("../public/assets/isLoggedIn");
const checkCommentOwnership = require("../public/assets/checkCommentOwnership");

// CREATE
router.post("/", isLoggedIn, (req, res) => {
	Blog.findById(req.params.id, function (err, foundBlog) {
		if (err || !foundBlog) {
			console.log(err);
			req.flash("error", "Sorry, the blog was not found. Please try again.");
			res.redirect("back");
		} else {
			Comment.create(req.body.comment)
				.catch(err => console.log(err))
				.then(newComment => {
					// associate user to comment
					newComment.user.id = req.user._id;
					newComment.user.username = req.user.username;
					newComment.save();

					// add comment to blog
					foundBlog.comments.push(newComment);
					foundBlog.save();

					req.flash("success", "You have successfully added a new comment!");
					res.redirect(`/blogs/${req.params.id}`);
				});
		}
	});
});

// UPDATE
router.put("/:comment_id", checkCommentOwnership, (req, res) => {
	Blog.findById(req.params.id, function (err, foundBlog) {
		if (err || !foundBlog) {
			console.log(err);
			req.flash("error", "Sorry, the blog was not found. Please try again.");
			return res.redirect("back");
		}
		let curComment = req.body.comment;
		curComment.created = moment().format("MMM Do, YYYY");
		Comment.findByIdAndUpdate(req.params.comment_id, curComment)
			.catch(err => {
				console.log(err);
				req.flash("error", "Sorry, there is something wrong when retrieving the comment. Please try again.");
				res.redirect("back");
			})
			.then(() => {
				req.flash("success", "You have successfully updated your comment!");
				res.redirect(`/blogs/${req.params.id}`);
			});
	});
});

// DELETE
router.delete("/:comment_id", checkCommentOwnership, (req, res) => {
	Blog.findById(req.params.id, function (err, foundBlog) {
		if (err || !foundBlog) {
			console.log(err);
			req.flash("error", "Sorry, the blog was not found. Please try again.");
			return res.redirect("back");
		}
		Comment.findByIdAndDelete(req.params.comment_id)
			.catch(err => {
				console.log(err);
				req.flash("error", "Sorry, there is something wrong when retrieving the comment. Please try again.");
				res.redirect("back");
			})
			.then(() => {
				req.flash("success", "You have successfully deleted your comment!");
				res.redirect(`/blogs/${req.params.id}`);
			});
	});
});

module.exports = router;