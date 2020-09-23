exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('medals').del()
    .then(function () {
      // Inserts seed entries
      return knex('medals').insert([
        { id: 1, name: 'Strong Saver', image: 'http://linktostrongsaverimg.jpg' },
        { id: 2, name: 'Best Saver', image: 'http://linktobestsaverimg.jpg' },
        { id: 3, name: 'Poor Saver', image: 'http://linktopoorsaverimg.jpg' }
      ])
    })
}
