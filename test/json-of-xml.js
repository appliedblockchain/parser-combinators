// @flow

const either = require('../either')
const Invalid = require('../Invalid')
const literal = require('../literal')
const map = require('../map')
const pair = require('../pair')
const predicate = require('../predicate')
const regex = require('../regex')
const sequence = require('../sequence')
const star = require('../star')

/*::

import type { Parser } from '../types/parser'
type Id = {| type: 'Id', value: string, ns: ?string |}
type Attribute = {| type: 'Attribute', name: Id, value: string |}
type Element = {| type: 'Element', name: Id, attributes: Attribute[], children: Element[], text: ?string |}
type Node =
  | Id
  | Attribute
  | Element

*/

const nodeOf = (type, object) =>
  ({ type, ...object })

const ws0 =
  map(regex(/^[ \t\r\n]*/), _ => _.join(''))

const ws1 =
  map(regex(/^[ \t\r\n]+/), _ => _.join(''))

const id0 /*: Parser<Id> */ =
  map(pair(regex(/^[a-z_]/i), regex(/^[a-z0-9_-]*/i)), _ => nodeOf('Id', { value: _.join(''), ns: null }))

const id1 /*: Parser<Id> */ =
  map(sequence(id0, literal(':'), id0), _ => nodeOf('Id', { value: _[2].value, ns: _[0].value }))

const id /*: Parser<Id> */ =
  either(id1, id0)

const text0 /*: Parser<string> */ =
  map(regex(/^[^<>]*/), _ => _.join(''))

const string /*: Parser<string> */ =
  either(
    map(sequence(literal('\''), regex(/^[^']*/), literal('\'')), ([ , _ ]) => _.join('')),
    map(sequence(literal('"'), regex(/^[^"]*/), literal('"')), ([ , _ ]) => _.join(''))
  )

const attribute /*: Parser<Attribute> */=
  map(sequence(ws1, id, literal('='), string), ([ , name, , value ]) => ({ type: 'Attribute', name, value }))

const element1 /*: Parser<Element> */ =
  map(sequence(ws0, literal('<'), id, star(attribute), ws0, literal('/>')), ([ , , name, attributes ]) => ({ type: 'Element', name, attributes, children: [], text: undefined }))

const elementL /*: Parser<Element> */ =
  map(sequence(ws0, literal('<'), id, star(attribute), ws0, literal('>'), text0), ([ , , name, attributes, , , text_ ]) => ({ type: 'Element', name, attributes, children: [], text: text_.trim() === '' ? undefined : text_.trim() }))

const elementR /*: Parser<Id> */ =
  map(sequence(ws0, literal('</'), id, ws0, literal('>')), ([ , , name ]) => name)

const element /*: Parser<Element> */ =
  input =>
    either(
      element1,
      map(
        predicate(
          sequence(elementL, star(element), elementR),
          ([ _, , __ ]) => _.name.value === __.value && _.name.ns === __.ns
        ),
        ([ node, children ]) => ({ ...node, children })
      )
    )(input)

const push = (o /*: {} */, k /*: string */, v /*: mixed */) => (
  typeof o[k] === 'undefined' ?
    ((o[k] = v), o) : // eslint-disable-line no-param-reassign
    Array.isArray(o[k]) ?
      (o[k].push(v), o) :
      ((o[k] = [ o[k], v ]), o) // eslint-disable-line no-param-reassign
)

const objectOf = (entries /*: [string, mixed][] */) /*: { [string]: mixed } */ =>
  entries.reduce((r, [ k, v ]) => (push(r, k, v), r), {}) // eslint-disable-line no-param-reassign

const jsonOfAst = (node /*: any */) => {
  switch (node.type) {
    case 'Element':
      return objectOf([
        ...(typeof node.text !== 'undefined' ? [ [ '_', node.text ] ] : []),
        ...node.attributes.map(_ => [ `_${_.name.value}`, _.value ]),
        ...node.children.map(_ => [ _.name.value, jsonOfAst(_) ])
      ])
    default:
      throw new TypeError(`Unknown node ${JSON.stringify(node)}.`)
  }
}

const jsonOfXml =
  (xml /*: string */) /*: {} */ => {
    const [ s, r ] = element(xml)
    if (s.trim() !== '') {
      throw new Invalid(s)
    }
    return jsonOfAst(r)
  }

module.exports = jsonOfXml
