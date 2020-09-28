exports.up = function (knex) {
  return knex.schema.table('users', (table) => {
    table.dropColumn('created_at')
    table.date('created_at')
  })
}

exports.down = function (knex) {
  return knex.schema.table('users', (table) => {
    table.dropColumn('created_at')
    table.timestamp('created_at')
  })
}
