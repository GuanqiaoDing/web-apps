const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

// const pug = require("pug");
// const compiledFunction = pug.compileFile("views/extra.pug");

app.set("view engine", "pug");
app.use(express.static("assets"));
app.use(bodyParser.urlencoded({extended: true}));

let friends = ["Lily", "Tony", "Tim"];

app.get("/", (req, res) => {
	res.render("index", {
		title: "Welcome to Homepage!"
	});
});

app.get("/extra", (req, res) => {
	res.render("extra", {
		title: "Welcome to Extra stuff!"
	});
});

app.get("/friends", (req, res) => {
	res.render("friends", {
		friends: friends
	});
});

app.get("/:page", (req, res) => {
	res.render("index", {
		title: `Welcome to ${req.params.page} page!`
	})
});

app.post("/addfriend", (req, res) => {
	friends.push(req.body.friend);
	res.redirect("/friends");
});

app.post("/removefriend", (req, res) => {
	let i = friends.indexOf(req.body.friend);
	if (i > -1) friends.splice(i, 1);
	res.redirect("/friends");
});

app.listen(port, () => {
	console.log(`App is listening at port ${port}!`);
});