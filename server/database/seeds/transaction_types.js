exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('transaction_types').del()
    .then(function () {
      // Inserts seed entries
      return knex('transaction_types').insert([
        { id: 1, category: 'Salary' },
        { id: 2, category: 'Savings' },
        { id: 3, category: 'Investments' },
        { id: 4, category: 'Transport' },
        { id: 5, category: 'Socialising' },
        { id: 6, category: 'Hobbies' }
      ])
    })
}
