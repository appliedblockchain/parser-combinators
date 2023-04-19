import signedDecimal from '../naive/signed-decimal.js'

test('naive/signed-decimal', () => {
  expect(signedDecimal('-012')).toEqual([ '', -12 ])
  expect(signedDecimal('123')).toEqual([ '', 123 ])
  expect(signedDecimal('-0')).toEqual([ '', -0 ])
  expect(signedDecimal('-1')).toEqual([ '', -1 ])
  expect(() => signedDecimal('foo')).toThrowError('foo')
})
