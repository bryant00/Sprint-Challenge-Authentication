"use strict";

const { Model } = require("objection");

class Joke extends Model {
	static get tableName() {
		return "jokes";
	}

	static get relationMappings() {
		return {
			joke_box: {
				relation: Model.ManyToManyRelation,
				modelClass: __dirname + "/User",
				join: {
					from: "jokes.id",
					through: {
						from: "users_jokes.jokeid",
						to: "users_jokes.userid"
					},
					to: "users.id"
				}
			}
		};
	}
}

module.exports = Joke;
