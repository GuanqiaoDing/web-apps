const express = require("express");
const router = express.Router({mergeParams: true});

const Blog = require("../schema/blog");
const Comment = require("../schema/comment");
const moment = require("moment");
const isLoggedIn = require("../public/assets/isLoggedIn");
const checkCommentOwnership = require("../public/assets/checkCommentOwnership");

// CREATE
router.post("/", isLoggedIn, (req, res) => {
	Blog.findById(req.params.id)
		.catch(err => console.log(err))
		.then(foundBlog => {
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
					res.redirect(`/blogs/${req.params.id}`);
				});
		});
});

// UPDATE
router.put("/:comment_id", checkCommentOwnership, (req, res) => {
	let curComment = req.body.comment;
	curComment.created = moment().format("MMM Do, YYYY");
	console.log(curComment);
	Comment.findByIdAndUpdate(req.params.comment_id, curComment)
		.catch(err => {
			console.log(err);
			res.redirect("back");
		})
		.then(() => {
			res.redirect(`/blogs/${req.params.id}`);
		});
});

// DELETE
router.delete("/:comment_id", checkCommentOwnership, (req, res) => {
	Comment.findByIdAndDelete(req.params.comment_id)
		.catch(err => {
			console.log(err);
			res.redirect("back");
		})
		.then(() => {
			res.redirect(`/blogs/${req.params.id}`);
		});
});

module.exports = router;