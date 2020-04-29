"use strict";

const { Model } = require("objection");
const Joke = require("./Joke");

class User extends Model {
	static get tableName() {
		return "users";
	}
	static get relationMappings() {
		return {
			// newjokes: {
			// 	relation: Model.ManyToManyRelation,
			// 	modelClass: Joke,
			// 	join: {
			// 		from: "users.id",
			// 		through: {
			// 			from: "users_jokes.userid",
			// 			to: "users_jokes.jokeid"
			// 		},
			// 		to: "jokes.id"
			// 	}
			// },
			// jokes_pinned: {
			// 	relation: Model.ManyToManyRelation,
			// 	modelClass: Joke,
			// 	join: {
			// 		from: "jokes.id",
			// 		through: {
			// 			from: "users_jokes.jokeid",
			// 			to: "users_jokes.userid"
			// 		},
			// 		to: "users.id"
			// 	}
			// },
			jokes: {
				relation: Model.ManyToManyRelation,
				modelClass: Joke,
				join: {
					from: "jokes.id",
					through: {
						from: "users_jokes.userid",
						to: "users_jokes.jokeid"
					},
					to: "users.id"
				}
			}
		};
	}
}

module.exports = User;
