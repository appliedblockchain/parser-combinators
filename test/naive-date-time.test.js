// @flow

const dateTime = require('../naive/date-time')

test('naive/date-time', async () => {
  await expect(dateTime('2001-02-03T04:05:06foo')).resolves.toEqual([ 'foo', new Date('2001-02-03T04:05:06') ])
})
