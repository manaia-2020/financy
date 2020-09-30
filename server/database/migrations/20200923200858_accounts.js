exports.up = function (knex) {
  return knex.schema.createTable('accounts', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.float('balance')
    table.integer('user_id')
    table.foreign('user_id').references('id').inTable('users')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('accounts')
}
