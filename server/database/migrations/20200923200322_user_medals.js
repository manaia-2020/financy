exports.up = function (knex) {
  return knex.schema.createTable('users_medals', (table) => {
    table.integer('user_id')
    table.integer('medal_id')
    table.timestamp('awarded_at')
    table.foreign('user_id').references('id').inTable('users')
    table.foreign('medal_id').references('id').inTable('medals')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users_medals')
}
