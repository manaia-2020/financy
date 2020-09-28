exports.up = function (knex) {
  return knex.schema.createTable('balance_history', (table) => {
    table.increments('id').primary()
    table.float('balance')
    table.timestamp('balance_updated_at')
    table.integer('account_id')
    table.foreign('account_id').references('id').inTable('accounts')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('balance_history')
}
