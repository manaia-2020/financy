exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('recurring_transactions').del()
    .then(function () {
      // Inserts seed entries
      return knex('recurring_transactions').insert([
        { id: 1, amount: 250.00, frequency: 7 },
        { id: 2, amount: 250.00, frequency: 14 },
        { id: 3, amount: 250.00, frequency: 28 }
      ])
    })
}
