// @flow

const date = require('../naive/date')

test('naive/date', async () => {
  await expect(date('2001-02-03foo')).resolves.toEqual([ 'foo', new Date('2001-02-03') ])
  await expect(date('2001-13-01')).rejects.toThrowError('2001-13-01')
})
