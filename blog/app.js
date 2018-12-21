// admin.js has the username and password and is git ignored
const admin = require("./helper/admin");

const express = require("express"),
			mongoose = require("mongoose"),
			bodyParser = require("body-parser"),
			moment = require("moment"),
			flash = require("connect-flash");
			methodOverride = require("method-override"),
			passport = require("passport"),
			LocalStrategy = require("passport-local"),
			User = require("./schema/user");

const blogRoute = require("./routes/blogs"),
			commentRoute = require("./routes/comments"),
			indexRoute = require("./routes/index");

// app config
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());
app.set("view engine", "pug");

// passport config
app.use(require("express-session")({
	secret: `${admin.secret}`,
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

// add routes
app.use("/", indexRoute);
app.use("/blogs", blogRoute);
app.use("/blogs/:id/comments",commentRoute);

// MongoDB login
const dbURL = `mongodb+srv://${admin.user}:${admin.password}@cluster0-ia9vl.mongodb.net/blog_app?retryWrites=true`;
mongoose.connect(dbURL, {useNewUrlParser: true, useFindAndModify: false})
	.catch(err => console.log(err))
	.then(() => console.log("MongoDB connected!"));

// start local server
app.listen(80,() => {
	console.log(`${moment().format("MMM Do, YYYY -- h:mm:ss a")}: Blog has started at port 80!`);
});
