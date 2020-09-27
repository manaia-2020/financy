/* eslint-disable */
const knex = require('knex')

const config = require('../../knexfile').test
const { getTransactions, newTransaction, addRecurring, addTransaction, getCurrentBalance, updateBalance } = require('./bankDb')

const testDb = knex(config)
beforeAll(() => testDb.migrate.latest())
beforeEach(() => testDb.seed.run())
afterAll(() => testDb.destroy())

test('test ', () => {
  expect(1).toBe(1)
})


// describe('getTransactions', () => {
//   test('Returns all transactions', () => {
//     expect.assertions(3)
//     return getTransactions(1, testDb)
//       .then((trans) => {
//         expect(trans).toHaveLength(1)
//         expect(trans[0].amount).toBe(25.00)
//         expect(trans[0].id).toBe(1)
//         return null
//       })
//   })
// })

// describe('addRecurring', () => {
//   test('Adds a record to recurring_transactions table', () => {
//     expect.assertions(1)
//     return addRecurring(7, testDb)
//       .then((transId) => {
//         expect(transId[0]).toBe(4)
//         return null
//       })
//   })
// })

// describe('addTransaction', () => {
//   const body = { amount: 12.95, date: '31/12/2020' }
//   test('Adds a new transaction record for userId 2', () => {
//     expect.assertions(2)
//     return addTransaction(body, 2, null, testDb)
//       .then((newTransId) => {
//         return getTransactions(2, testDb)
//       })
//       .then((trans) => {
//         expect(trans).toHaveLength(2)
//         expect(trans[1].amount).toBe(12.95)
//         return null
//       })
//   })

//   test('Adds transaction then updates balance correctly', () => {
//     expect.assertions(1)
//     return addTransaction(body, 2, null, testDb)
//       .then(() => {
//         return getCurrentBalance(2, testDb)
//       })
//       .then((userBalance) => {
//         expect(userBalance.balance).toBe(512.95)
//         return null
//       })
//   })
// })

// describe('newTransaction', () => {
//   test('Adds a new transaction if recurring is true for userId 2', () => {
//     const body = { amount: 12.95, date: '31/12/2020', recurring: true, frequency: 7 }
//     const userId = 2
//     expect.assertions(2)
//     return newTransaction(body, userId, testDb)
//       .then((newTransId) => {
//         return getTransactions(userId, testDb)
//       })
//       .then((trans) => {
//         expect(trans).toHaveLength(2)
//         expect(trans[1].recurring_transaction_id).toBe(5)
//         return null
//       })
//   })
//   test('Adds a new transaction only if recurring is false', () => {
//     const body = { amount: 12.95, date: '31/12/2020', recurring: false }
//     const userId = 2
//     expect.assertions(2)
//     return newTransaction(body, userId, testDb)
//       .then((newTransId) => {
//         return getTransactions(userId, testDb)
//       })
//       .then((trans) => {
//         expect(trans).toHaveLength(2)
//         expect(trans[1].recurring_transaction_id).toBeNull()
//         return null
//       })
//   })
// })

// describe('getBalance', () => {
//   test('Returns balance for userId', () => {
//     expect.assertions(2)
//     return getCurrentBalance(2, testDb)
//       .then((userBalance) => {
//         expect(userBalance.balance).toBe(500.00)
//         expect(userBalance.user_id).toBe(2)
//         return null
//       })
//   })

//   test('Returns newest balance', () => {
//     expect.assertions(2)
//     return getCurrentBalance(2, testDb)
//       .then((userBalance) => {
//         expect(userBalance.balance).not.toBe(450.00)
//         expect(userBalance.balance_updated_at).not.toBe(1600990006895)
//         return null
//       })
//   })
// })

// describe('updateBalance', () => {
//   test('Updates a positive balance for a decimal', () => {
//     expect.assertions(1)
//     return updateBalance(15.95, 2, testDb)
//       .then(() => {
//         return getCurrentBalance(2, testDb)
//       })
//       .then((userBalance) => {
//         expect(userBalance.balance).toBe(515.95)
//         return null
//       })
//   })
// })

// describe('udpdateBalance', () => {
//   test('updated a negative balance', () => {
//     expect.assertions(1)
//     return updateBalance(-10.50, 2, testDb)
//       .then(() => {
//         return getCurrentBalance(2, testDb)
//       })
//       .then((userBalance) => {
//         expect(userBalance.balance).toBe(489.50)
//         return null
//       })
//   })
// })
