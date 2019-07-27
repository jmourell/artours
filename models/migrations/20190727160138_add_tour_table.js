exports.up = function(knex, Promise) {
  // create the 'Tours' table with three columns
  return knex.schema.createTable("Tours", t => {
    t.increments() // auto-incrementing id column
      .index(); // index this column

    t.string("tour_name") // maximum length of 15 characters
      .unique() // add a unique constraint to this column
      .notNullable() // add a not-null constraint to this column
      .index(); // index it

    //t.integer("rating_id");
    //t.foreign("rating_id").references("ratings.id");

    t.timestamp("created_at")
      .notNullable()
      .defaultTo(knex.fn.now());
    t.text("description");
    t.text("address");
    t.string("photo");
  });
};

exports.down = function(knex, Promise) {
  // undo this migration by destroying the 'users' table
  return knex.schema.dropTable("Tours");
};
