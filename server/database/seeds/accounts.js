exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('accounts').del()
    .then(function () {
      // Inserts seed entries
      return knex('accounts').insert([
        { id: 1, name: 'Savings', balance: 10000.00, balance_updated_at: Date.now(), user_id: 1 },
        { id: 2, name: 'Spendings', balance: 500.00, balance_updated_at: Date.now(), user_id: 2 },
        { id: 3, name: 'Spendings', balance: 450.00, balance_updated_at: 1600990006895, user_id: 2 },
        { id: 4, name: 'Spendings', balance: 350.00, balance_updated_at: 1600990006897, user_id: 2 },
        { id: 5, name: 'Spendings', balance: 395.00, balance_updated_at: 1600385206000, user_id: 2 }
      ])
    })
}
