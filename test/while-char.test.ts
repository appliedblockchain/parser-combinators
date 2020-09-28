import $ from '../'

const ws0 =
  $.exhaustiveResult($.whileChar(' '))

const ws1 =
  $.exhaustiveResult($.whileChar(' ', 1))

test('whileChar', () => {
  expect(ws0(' ')).toEqual(' ')
  expect(ws1(' ')).toEqual(' ')
  expect(ws0('')).toEqual('')
  expect(() => ws1('')).toThrow()
})
