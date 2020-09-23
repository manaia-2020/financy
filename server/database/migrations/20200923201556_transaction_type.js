exports.up = function (knex) {
  return knex.schema.createTable('transaction_types', (table) => {
    table.increments('id').primary()
    table.string('category')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('transaction_type')
}
