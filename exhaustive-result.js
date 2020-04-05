// @flow

const Invalid = require('./invalid')

const exhaustiveResult /*: <R>(string => [string, R]) => R */ = /*:: <R> */
  (a) =>
    input => {
      const [ s, r ] = a(input)
      if (s !== '') {
        throw new Invalid(`Unparsed ${s}.`)
      }
      return r
    }

module.exports = exhaustiveResult
