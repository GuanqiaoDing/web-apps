const Blog = require("../../schema/blog");

function checkBlogOwnership (req, res, next) {
	if (req.isAuthenticated()) {
		Blog.findById(req.params.id)
			.catch(err => {
				console.log(err);
				res.redirect("back");
			})
			.then(foundBlog => {
				if (foundBlog.user.id.equals(req.user._id)) {
					return next();
				}
				res.redirect("back");
			});
	} else {
		res.redirect("back");
	}
}

module.exports = checkBlogOwnership;