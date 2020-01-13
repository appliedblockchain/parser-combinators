// @flow

const {
  either,
  Invalid,
  lit,
  map,
  pair,
  pred,
  regex,
  seq,
  star
} = require('../')

/*::

import type { Parser } from '../'
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
  map(seq(id0, lit(':'), id0), _ => nodeOf('Id', { value: _[2].value, ns: _[0].value }))

const id /*: Parser<Id> */ =
  either(id1, id0)

const text0 /*: Parser<string> */ =
  map(regex(/^[^<>]*/), _ => _.join(''))

const string /*: Parser<string> */ =
  either(
    map(seq(lit('\''), regex(/^[^']*/), lit('\'')), ([ , _ ]) => _.join('')),
    map(seq(lit('"'), regex(/^[^"]*/), lit('"')), ([ , _ ]) => _.join(''))
  )

const attribute /*: Parser<Attribute> */=
  map(seq(ws1, id, lit('='), string), ([ , name, , value ]) => ({ type: 'Attribute', name, value }))

const element1 /*: Parser<Element> */ =
  map(seq(ws0, lit('<'), id, star(attribute), ws0, lit('/>')), ([ , , name, attributes ]) => ({ type: 'Element', name, attributes, children: [], text: undefined }))

const elementL /*: Parser<Element> */ =
  map(seq(ws0, lit('<'), id, star(attribute), ws0, lit('>'), text0), ([ , , name, attributes, , , text_ ]) => ({ type: 'Element', name, attributes, children: [], text: text_.trim() === '' ? undefined : text_.trim() }))

const elementR /*: Parser<Id> */ =
  map(seq(ws0, lit('</'), id, ws0, lit('>')), ([ , , name ]) => name)

const element /*: Parser<Element> */ =
  async input =>
    either(
      element1,
      map(
        pred(
          seq(elementL, star(element), elementR),
          async ([ _, , __ ]) => _.name.value === __.value && _.name.ns === __.ns
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

const jsonOfXml = (xml /*: string */) /*: Promise<{}> */ =>
  element(xml).then(_ => {
    if (_[0].trim() !== '') {
      throw new Invalid(_[0])
    }
    return jsonOfAst(_[1])
  })

module.exports = jsonOfXml
