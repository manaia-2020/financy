exports.up = function (knex) {
  return knex.schema.createTable('goals', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.date('goal_date')
    table.integer('user_id')
    table.foreign('user_id').references('id').inTable('users')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('goals')
}
