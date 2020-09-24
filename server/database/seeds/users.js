exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, first_name: 'Bruce', last_name: 'Willis', email: 'bruce@diehard.com', password_hash: '', created_at: Date.now() },
        { id: 2, first_name: 'Will', last_name: 'Smith', email: 'will@irobot.com', password_hash: '', created_at: Date.now() }
      ])
    })

}