exports.up = function (knex) {
  return knex.schema.createTable('transactions', (table) => {
    table.increments('id').primary()
    table.float('amount')
    table.timestamp('date')
    table.integer('user_id')
    table.integer('transaction_type_id')
    table.integer('recurring_transaction_id')
    table.foreign('user_id').references('id').inTable('users')
    table.foreign('transaction_type_id').references('id').inTable('transaction_types')
    table.foreign('recurring_transaction_id').references('id').inTable('recurring_transactions')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('transactions')
}
