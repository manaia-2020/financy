exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('transactions').del()
    .then(function () {
      // Inserts seed entries
      return knex('transactions').insert([
        { id: 1, amount: 25.00, date: Date.now(), user_id: 1, transaction_type_id: 2, account_id: 2, name: 'Dominos' },
        { id: 2, amount: 12.95, date: Date.now(), user_id: 2, transaction_type_id: 4, account_id: 6, name: 'BK' },
        { id: 3, amount: 24.55, date: Date.now(), user_id: 3, transaction_type_id: 4, account_id: 7, name: 'Maccas' },
        { id: 4, amount: 10.55, date: Date.now(), user_id: 2, transaction_type_id: 4, account_id: 6, name: 'Pizza Hut' },
        { id: 5, amount: 18.70, date: Date.now(), user_id: 3, transaction_type_id: 4, account_id: 7, name: 'KFC' },
        { id: 6, amount: 19.95, date: Date.now(), user_id: 2, transaction_type_id: 4, account_id: 6, name: 'Carls Jnr' },
        { id: 7, amount: 52.50, date: Date.now(), user_id: 3, transaction_type_id: 4, account_id: 7, name: 'Hells Pizza' },
        { id: 8, amount: 13.95, date: Date.now(), user_id: 2, transaction_type_id: 4, account_id: 6, name: 'Subway' },
        { id: 9, amount: 7.95, date: Date.now(), user_id: 3, transaction_type_id: 4, account_id: 7, name: 'Chipotle(The promised land)' }
      ])
    })
}
