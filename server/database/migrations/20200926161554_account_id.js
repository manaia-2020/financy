exports.up = function (knex) {
  return knex.schema.table('transactions', (table) => {
    table.integer('account_id')
    table.foreign('account_id').references('id').inTable('accounts')
  })
}

exports.down = function (knex) {
  return knex.dropColumn('account_id')
}
