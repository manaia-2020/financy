exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('medals').del()
    .then(function () {
      // Inserts seed entries
      return knex('medals').insert([
        { id: 1, name: 'Strong Saver', image: 'https://cdn.pixabay.com/photo/2013/07/12/16/34/award-151151_960_720.png'},
        { id: 2, name: 'Best Saver', image: 'https://cdn.pixabay.com/photo/2017/01/28/11/43/cup-2015198_960_720.png'},
        { id: 3, name: 'Poor Saver', image: 'https://cdn.pixabay.com/photo/2018/10/03/11/31/wallet-3721156_960_720.png'}
      ])
    })
}

