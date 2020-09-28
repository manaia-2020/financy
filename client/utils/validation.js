export function isEmpty (value) {
  return !value
}

export function isValidEmail (email) {
  // eslint-disable-next-line no-useless-escape
  return /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,5}$/.test(email)
}

export function isPasswordMatch (password, confirmedPassword) {
  return confirmedPassword === password
}
