export const formatAmount = (s) => {
  const options = {
    maximumFractionDigits: 2,
    currency: 'NZD',
    style: 'currency',
    currencyDisplay: 'symbol'
  }

  return localStringToNumber(s).toLocaleString(undefined, options)
}

export const localStringToNumber = (s) => {
  return Number(String(s).replace(/[^0-9.-]+/g, ''))
}
