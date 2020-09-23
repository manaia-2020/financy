exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('accounts').del()
    .then(function () {
      // Inserts seed entries
      return knex('accounts').insert([
        { id: 1, name: 'Savings', balance: 10000.00, balance_updated_at: Date.now(), user_id: 1 },
        { id: 2, name: 'Spendings', balance: 500.00, balance_updated_at: Date.now(), user_id: 2 }
      ])
    })
}
