const Comment = require("../../schema/comment");

function checkCommentOwnership (req, res, next) {
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id)
			.catch(err => {
				console.log(err);
				res.redirect("back");
			})
			.then(foundComment => {
				if (foundComment.user.id.equals(req.user._id)) {
					return next();
				}
				res.redirect("back");
			});
	} else {
		res.redirect("back");
	}
}

module.exports = checkCommentOwnership;