// dbLogin.js has the username and password and is git ignored
require("./dbLogin.js");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const sanitizer = require("express-sanitizer");
const moment = require("moment");
const methodOverride = require("method-override");
const app = express();
const url = `mongodb+srv://${process.env["DB_username"]}:${process.env["DB_password"]}@cluster0-ia9vl.mongodb.net/blog_app?retryWrites=true`;
const port = 3000;

// app config
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(sanitizer());
app.use(methodOverride("_method"));
app.set("view engine", "pug");
mongoose.connect(url, {useNewUrlParser: true, useFindAndModify: false})
	.catch(err => console.log(err))
	.then();

// mongoose config
const blogSchema = new mongoose.Schema({
	title: String,
	image: {type: String, default: "https://pixabay.com/get/ea37b80821fd053ed1584d05fb1d4e97e07ee3d21cac104491f5c178aeeab6bf_340.jpg"},
	body: String,
	created: {type: String, default: moment().format("MMM Do, YYYY")}
});
const Blog = mongoose.model("blog", blogSchema);

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

// RESTFUL routes
// landing page
app.get("/", (req, res) => {
	res.render("index");
});
// INDEX route
app.get("/blogs", (req, res) => {
	Blog.find({})
		.catch(err => console.log(err))
		.then(blogs => {
			res.render("blogs", {blogs: blogs});
		})
});
// NEW route
app.get("/blogs/new", (req, res) => {
	res.render("new");
});
// CREATE route
app.post("/blogs", (req, res) => {
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.create(req.body.blog)
		.catch(err => console.log(err))
		.then(() => {
			res.redirect("/blogs");
		});
});
// SHOW route
app.get("/blogs/:id", (req, res) => {
	Blog.findById(req.params.id)
		.catch(err => console.log(err))
		.then(foundBlog => {
			res.render("show", {blog: foundBlog});
		});
});
// EDIT route
app.get("/blogs/:id/edit", (req, res) => {
	Blog.findById(req.params.id)
		.catch(err => console.log(err))
		.then(foundBlog => {
			res.render("edit", {blog: foundBlog});
		});
});
// UPDATE route
app.put("/blogs/:id", (req, res) => {
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog)
		.catch(err => console.log(err))
		.then(() => {
			res.redirect(`/blogs/${req.params.id}`);
		});
});
// DELETE route
app.delete("/blogs/:id", (req, res) => {
	Blog.findByIdAndDelete(req.params.id)
		.catch(err => console.log(err))
		.then(() => {
			res.redirect("/blogs");
		});
});

app.listen(port, () => {
	console.log(`Blog has started at port ${port}!`);
});
