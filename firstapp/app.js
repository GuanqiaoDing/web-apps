const express = require("express");
const app = express();
const port = 3000;

// const pug = require("pug");
// const compiledFunction = pug.compileFile("views/index.pug");

app.set("view engine", "pug");

app.get("/", (req, res) => {
	res.render("index", {
		title: "Welcome to Homepage!"
	});
});

app.get("/:page", (req, res) => {
	res.render("index", {
		title: `Welcome to ${req.params.page} page!`
	})
});

app.listen(port, () => {
	console.log(`App is listening at port ${port}!`);
});