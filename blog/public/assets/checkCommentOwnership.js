const Comment = require("../../schema/comment");

function checkCommentOwnership (req, res, next) {
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function (err, foundComment) {
			if (err || !foundComment) {
				req.flash("error", "Sorry, the comment was not found...");
				res.redirect(`/blogs/${req.params.id}`);
			} else {
				if (foundComment.user.id.equals(req.user._id)) {
					return next();
				}
				req.flash("error", "You don't have the authorization to do that!");
				res.redirect(`/blogs/${req.params.id}`);
			}
		});
	} else {
		req.flash("error", "Please sign in first to do that!");
		res.redirect("/login");
	}
}

module.exports = checkCommentOwnership;