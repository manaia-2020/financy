exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('accounts').del()
    .then(function () {
      // Inserts seed entries
      return knex('accounts').insert([
        { id: 1, name: 'Savings', user_id: 1 },
        { id: 2, name: 'Spendings', user_id: 2 },
        { id: 3, name: 'Spendings', user_id: 2 },
        { id: 4, name: 'Spendings', user_id: 2 },
        { id: 5, name: 'Spendings', user_id: 2 },
        { id: 6, name: 'Cash Money', user_id: 3 },
        { id: 7, name: 'I need a dolla dolla', user_id: 3 }
      ])
    })
}
