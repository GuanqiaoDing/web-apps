const mongoose = require("mongoose");
const moment = require("moment");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
	username: String,
	email: String,
	password: String,
	created: {type: String, default: moment().format("MMM Do, YYYY")}
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user", userSchema);