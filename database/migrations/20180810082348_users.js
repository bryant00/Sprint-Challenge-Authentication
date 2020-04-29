exports.up = function(knex) {
	return knex.schema
		.createTable("users", users => {
			users.increments("id").primary();
			users
				.string("username", 255)
				.notNullable()
				.unique();
			users.string("password", 255).notNullable();
		})
		.createTable("jokes", jokes => {
			jokes.increments("id").primary();
			jokes.string("joke", 255).notNullable();
		})
		.createTable("users_jokes", table => {
			table.increments("id").primary();
			table
				.integer("userid")
				.unsigned()
				.references("id")
				.inTable("users")
				.onDelete("CASCADE")
				.index();
			table
				.integer("jokeid")
				.unsigned()
				.references("id")
				.inTable("jokes")
				.onDelete("CASCADE")
				.index();
		});
};

exports.down = function(knex, Promise) {
	return knex.schema
		.dropTableIfExists("users_jokes")
		.dropTableIfExists("jokes")
		.dropTableIfExists("users");
};
