import date from '../naive/date'

test('naive/date', () => {
  expect(date('2001-02-03foo')).toEqual([ 'foo', new Date('2001-02-03') ])
  expect(() => date('2001-13-01')).toThrowError('2001-13-01')
})
