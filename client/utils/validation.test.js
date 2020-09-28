import { isEmpty, isValidEmail, isPasswordMatch } from './validation'

describe('isEmpty', () => {
  test('return false if not empty', () => {
    const value = 1
    expect.assertions(1)
    expect(isEmpty(value)).not.toBeTruthy()
  })

  test('return true if empty', () => {
    const value = ''
    expect.assertions(1)
    expect(isEmpty(value)).toBeTruthy()
  })
})

describe('isValidEmail', () => {
  test('returns false if not a valid email', () => {
    const email = 'adsf*gmail.com'
    expect.assertions(1)
    expect(isValidEmail(email)).not.toBeTruthy()
  })

  test('returns true if it is a valid email', () => {
    const email = 'asdf@gmail.com'
    expect.assertions(1)
    expect(isValidEmail(email)).toBeTruthy()
  })
})

describe('isPasswordMath', () => {
  test('returns false if the password does not match', () => {
    const password = 'jesus'
    const confirmedPassword = 'mary'
    expect.assertions(1)
    expect(isPasswordMatch(password, confirmedPassword)).not.toBeTruthy()
  })

  test('returns true if the password does match', () => {
    const password = 'jesus'
    const confirmedPassword = 'jesus'
    expect.assertions(1)
    expect(isPasswordMatch(password, confirmedPassword)).toBeTruthy()
  })
})
