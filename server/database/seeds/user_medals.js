exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users_medals').del()
    .then(function () {
      // Inserts seed entries
      return knex('users_medals').insert([
        { user_id: 1, medal_id: 1, awarded_at: Date.now() },
        { user_id: 2, medal_id: 3, awarded_at: Date.now() },
        { user_id: 1, medal_id: 2, awarded_at: Date.now() }
      ])
    })
}
