exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('balance_history').del()
    .then(function () {
      // Inserts seed entries
      return knex('balance_history').insert([
        { id: 1, balance: 10000.00, balance_updated_at: Date.now(), account_id: 7 },
        { id: 2, balance: 500.00, balance_updated_at: Date.now() - 1, account_id: 7 },
        { id: 3, balance: 450.00, balance_updated_at: 1600990006895, account_id: 7 },
        { id: 4, balance: 350.00, balance_updated_at: 1600990006897, account_id: 7 },
        { id: 5, balance: 395.00, balance_updated_at: 1600385206000, account_id: 7 },
        { id: 6, balance: 395.00, balance_updated_at: 1600385206000, account_id: 7 },
        { id: 7, balance: 1.00, balance_updated_at: 1600385206000, account_id: 7 }
      ])
    })
}
