const Blog = require("../../schema/blog");

function checkBlogOwnership (req, res, next) {
	if (req.isAuthenticated()) {
		Blog.findById(req.params.id, function (err, foundBlog) {
			if (err || !foundBlog) {
				req.flash("error", "Sorry, the blog was not found...");
				res.redirect("back");
			} else {
				if (foundBlog.user.id.equals(req.user._id)) {
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

module.exports = checkBlogOwnership;