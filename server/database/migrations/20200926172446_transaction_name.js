exports.up = function (knex) {
  return knex.schema.table('transactions', (table) => {
    table.string('name')
  })
}

exports.down = function (knex) {
  return knex.schema.dropColumn('name')
}
