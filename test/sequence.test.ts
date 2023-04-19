import $ from '../index.js'

test('sequence', () => {
  const r: [ string, Date ] = $.exhaustiveResult($.sequence($.literal('date:'), $.naive.date))('date:2000-01-01')
  expect(r[0]).toEqual('date:')
  expect(r[1].toISOString()).toEqual('2000-01-01T00:00:00.000Z')
})
