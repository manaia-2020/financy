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
