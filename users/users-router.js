"use strict";
const { transaction } = require("objection");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");
const bcrypt = require("bcrypt");
const User = require("../database/models/User");
const Joke = require("../database/models/Joke");

//app.use("/api/users", usersRouter)
module.exports = router => {
	router.get("/all", async (req, res) => {
		try {
			const users = await User.query();
			res.send(users);
		} catch (err) {
			console.log(err instanceof objection.ValidationError);
			console.log(err.data);
		}
	});

	router.get("/:id", async (req, res) => {
		const user = await User.query().findById(req.params.id);
		if (!user) {
			throw createStatusCodeError(404);
		}
		res.send(user);
	});

	//get a user's jokes
	//http://localhost:3300/api/users/1/jokes
	router.get("/:id/jokes", async (req, res) => {
		const user = await User.query().findById(req.params.id);
		if (!user) {
			throw createStatusCodeError(404);
		}
		const jokes = await user.$relatedQuery("jokes").skipUndefined();
		res.send(jokes);
	});

	// Add existing Joke as a savedjoke to a user.
	router.post("/:id/jokes", async (req, res) => {
		const user = await User.query().findById(req.params.id);
		if (!user) {
			throw createStatusCodeError(404);
		}
		await user.$relatedQuery("jokes").relate(req.body.id);
		res.send(req.body);
	});
	//add a new joke to a user, in the req body
	router.post("/:id/newjoke", async (req, res) => {
		const newjoke = req.body.joke;
		const user = await User.query().findById(req.params.id);
		if (!user) {
			throw createStatusCodeError(404);
		}
		const joke = await user
			.$relatedQuery("jokes")
			.insert({ joke: newjoke });

		res.send(joke);
	});
};

function createStatusCodeError(statusCode) {
	return Object.assign(new Error(), {
		statusCode
	});
}
