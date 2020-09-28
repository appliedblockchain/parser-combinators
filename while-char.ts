import { inspect } from 'util'
import Invalid from './invalid'
import type P from './types/parser'

export const whileChar: (chars: string, min?: number) => P<string> =
  (chars, min = 0) =>
    input => {
      let i
      for (i = 0; i < input.length; i++) {
        if (!chars.includes(input[i])) {
          break
        }
      }
      if (i < min) {
        throw new Invalid(`Expected ${min} minimum characters passing predicate, character ${inspect(input[i])} didn't pass.`)
      }
      return [ input.slice(i), input.slice(0, i) ]
    }

export default whileChar
