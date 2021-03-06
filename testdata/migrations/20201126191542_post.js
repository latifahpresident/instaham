//TEST MIGRATIONS FOR POST TABLE
exports.up = function(knex, Promise) {
    return knex.schema.createTable("post", post => {
        post.increments().primary();
        post.string("firebase_id").references("firebase_id").inTable("user").onUpdate("CASCADE").onDelete("CASCADE");
        post.string("image_url").notNullable();
        post.integer("likes").defaultTo(0);
        post.string("caption");
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("post")
  }
