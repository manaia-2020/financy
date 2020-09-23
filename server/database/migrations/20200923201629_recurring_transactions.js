exports.up = function (knex) {
  return knex.schema.createTable('recurring_transactions', (table) => {
    table.increments('id').primary()
    table.float('amount')
    table.integer('frequency')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('recurring_transactions')
}
