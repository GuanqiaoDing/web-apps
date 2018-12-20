const mongoose = require("mongoose");
const moment = require("moment");

const blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: String, default: moment().format("MMM Do, YYYY")},
	user: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user"
		},
		username: String
	},
	comments: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "comment"
	}]
});

module.exports = mongoose.model("blog", blogSchema);

// Blog.create({
// 	title: "Kitchen Design",
// 	image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80",
// 	body: "This is a contemporary style kitchen with a clean design."
// }).catch(err => console.log(err))
// 	.then(blog => console.log(blog));
//
// Blog.find({})
// 	.then(blogs => console.log(blogs))
// 	.catch(err => console.log(err));