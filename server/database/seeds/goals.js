exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('goals').del()
    .then(function () {
      // Inserts seed entries
      return knex('goals').insert([
        { id: 1, name: 'Go on a holiday', amount: 2330, goal_date: '04/03/2021', user_id: 1 },
        { id: 2, name: 'Buy new golf clubs', amount: 123, goal_date: '04/03/2021', user_id: 2 }
      ])
    })
}
