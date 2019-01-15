const express = require("express");
const axios = require("axios");
const port = process.env.PORT;
const app = express();

app.set("view engine", "pug");
app.use(express.static("public"));

async function getMovies (key, n) {
	const url1 = `http://www.omdbapi.com/?apikey=thewdb&s=${key}&page=${2 * n - 1}`;
	const url2 = `http://www.omdbapi.com/?apikey=thewdb&s=${key}&page=${2 * n}`;

	try {
		const promise1 = axios.get(url1);
		const promise2 = axios.get(url2);
		const [res1, res2] = await Promise.all([promise1, promise2]);
		let data = res1.data;
		if (data.Response === "True") {
			if (res2.data.Response === "True") {
				data.Search = data.Search.concat(res2.data.Search);
			}
			return data;
		}
	} catch (e) {
		console.error(e);
	}
}

app.get("/", (req, res) => {
	res.render("index");
});

app.get("/search", (req, res) => {
	const n = (req.query.page === undefined) ? 1 : Number(req.query.page);
	const key = req.query.key;
	if (key === undefined) {
		res.redirect("/");
	}
	else {
		getMovies(key, n)
			.then(data => {
				const last = Math.ceil(data.totalResults / 20);
				res.render("search", {data: data.Search, page: n, lastPage: last, key: key});
			})
			.catch(error => console.log(error));
	}
});

app.get("/movie", (req, res) => {
	const id = req.query.id;
	const page = req.query.page;
	const key = req.query.key;

	if (id === undefined) {
		res.redirect("/");
	}
	const url = `http://www.omdbapi.com/?apikey=thewdb&i=${id}&plot=full`;
	axios.get(url).then(response => {
		res.render("movie", {movie: response.data, page: page, key: key});
	}).catch(error => console.log(error));
});

app.listen(port, () => {
	console.log(`Movie App has started at port ${port}!`);
});