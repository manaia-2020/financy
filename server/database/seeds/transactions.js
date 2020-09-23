exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('transactions').del()
    .then(function () {
      // Inserts seed entries
      return knex('transactions').insert([
        { id: 1, amount: 25.00, date: Date.now(), user_id: 1, transaction_type_id: 2 },
        { id: 2, amount: 25.00, date: Date.now(), user_id: 2, transaction_type_id: 4, recurring_transaction_id: 1 }
      ])
    })
}
