exports.up = function (knex) {
  return knex.schema.createTable('medals', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.string('image')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('medals')
}
