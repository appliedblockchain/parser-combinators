import dateTime from '../naive/date-time.js'

test('naive/date-time', () => {
  expect(dateTime('2001-02-03T04:05:06foo')).toEqual([ 'foo', new Date('2001-02-03T04:05:06') ])
})
