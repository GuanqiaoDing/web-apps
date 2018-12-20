const mongoose = require("mongoose");
const moment = require("moment");

const commentSchema = new mongoose.Schema({
	user: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user"
		},
		username: String
	},
	content: String,
	created: {type: String, default: moment().format("MMM Do, YYYY")}
});

module.exports = mongoose.model("comment", commentSchema);