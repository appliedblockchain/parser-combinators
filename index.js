// @flow

/*::

export type Result<R> = Promise<[ string, R ]>
export type Parser<R> = string => Result<R>

*/

class Invalid extends Error {}

const lit = (expected /*: string */) /*: Parser<string> */ =>
  async input => {
    if (input.startsWith(expected)) {
      return [ input.slice(expected.length), expected ]
    }
    throw new Invalid(input)
  }

const pair = /*:: <A, B> */ (a /*: Parser<A> */, b /*: Parser<B> */) /*: Parser<[A, B]> */ =>
  async input =>
    a(input).then(_ => b(_[0]).then(__ => [ __[0], [ _[1], __[1] ] ]))

const map = /*:: <B, A, F: A => B> */(a /*: Parser<A> */, f /*: A => B */) /*: Parser<B> */ =>
  async input =>
    a(input).then(_ => [ _[0], f(_[1]) ])

const left = /*:: <A, B> */(a /*: Parser<A> */, b /*: Parser<B> */) /*: Parser<A> */ =>
  map(pair(a, b), _ => _[0])

const right = /*:: <A, B> */(a /*: Parser<A> */, b /*: Parser<B> */) /*: Parser<B> */ =>
  map(pair(a, b), _ => _[1])

const maybe = /*:: <A> */(a /*: Parser<A> */) /*: Parser<?A> */ =>
  async input => {
    const [ s, r ] = await a(input).catch(() => [ input, null ])
    return [ s, r ]
  }

const star = /*:: <A> */(a /*: Parser<A> */, min /*:: ?: number */ = 0) /*: Parser<A[]> */ =>
  async input => {
    const r = []
    let s = input
    const eat = _ => ((s = _[0]), r.push(_[1]), true)
    while (await a(s).then(eat).catch(() => false)) {}
    if (r.length < min) {
      throw new Invalid(input)
    }
    return [ s, r ]
  }

const plus = /*:: <A> */(a /*: Parser<A> */) /*: Parser<A[]> */ =>
  star(a, 1)

const times = /*:: <A> */(a /*: Parser<A> */, n /*: number */) /*: Parser<A[]> */ =>
  async input => {
    const r = []
    let s = input
    const eat = _ => ((s = _[0]), r.push(_[1]))
    for (let i = 0; i < n; i++) {
      await a(s).then(eat)
    }
    return [ s, r ]
  }

const range = /*:: <A> */(a /*: Parser<A> */, min /*: number */, max /*: number*/) /*: Parser<A[]> */ =>
  map(pair(times(a, min), star(a, max - min)), _ => [ ..._[0], ..._[1] ])

const regex = (re /*: RegExp */) /*: Parser<string[]> */ =>
  async input => {
    if (re.flags.includes('g')) {
      throw new TypeError(`Expected regex without g flag ${String(re)}.`)
    }
    const r = input.match(re)
    if (!r) {
      throw new Invalid(input)
    }
    return [ input.slice(r[0].length), r ]
  }

const pred = /*:: <A> */(a /*: Parser<A> */, f /*: A => Promise<boolean> */) /*: Parser<A> */ =>
  async input => {
    const r = await a(input)
    if (!(await f(r[1]))) {
      throw new Invalid(input)
    }
    return r
  }

const either = /*:: <A, B> */(a /*: Parser<A> */, b /*: Parser<B> */) /*: Parser<A | B> */ =>
  async input => {
    const [ s, r ] = await a(input).catch(() => b(input))
    return [ s, r ]
  }

const then = /*:: <A, B> */(a /*: Parser<A> */, f /*: A => Parser<B> */) /*: Parser<B> */ =>
  async input => a(input).then(_ => f(_[1])(_[0]))

/*::

// There is Sierpinski triangle and now we have flow triangle. Some say that the author
// decided on flow-types-in-comments because his editor would crash on this "beauty".

declare function seq<A>(Parser<A>): Parser<[A]>;
declare function seq<A,B>(Parser<A>,Parser<B>): Parser<[A,B]>;
declare function seq<A,B,C>(Parser<A>,Parser<B>,Parser<C>): Parser<[A,B,C]>;
declare function seq<A,B,C,D>(Parser<A>,Parser<B>,Parser<C>,Parser<D>): Parser<[A,B,C,D]>;
declare function seq<A,B,C,D,E>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>): Parser<[A,B,C,D,E]>;
declare function seq<A,B,C,D,E,F>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>): Parser<[A,B,C,D,E,F]>;
declare function seq<A,B,C,D,E,F,G>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>,Parser<G>): Parser<[A,B,C,D,E,F,G]>;
declare function seq<A,B,C,D,E,F,G,H>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>,Parser<G>,Parser<H>): Parser<[A,B,C,D,E,F,G,H]>;
declare function seq<A,B,C,D,E,F,G,H,I>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>,Parser<G>,Parser<H>,Parser<I>): Parser<[A,B,C,D,E,F,G,H,I]>;
declare function seq<A,B,C,D,E,F,G,H,I,J>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>,Parser<G>,Parser<H>,Parser<I>,Parser<J>): Parser<[A,B,C,D,E,F,G,H,I,J]>;
declare function seq<A,B,C,D,E,F,G,H,I,J,K>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>,Parser<G>,Parser<H>,Parser<I>,Parser<J>,Parser<K>): Parser<[A,B,C,D,E,F,G,H,I,J,K]>;
declare function seq<A,B,C,D,E,F,G,H,I,J,K,L>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>,Parser<G>,Parser<H>,Parser<I>,Parser<J>,Parser<K>,Parser<L>): Parser<[A,B,C,D,E,F,G,H,I,J,K,L]>;
declare function seq<A,B,C,D,E,F,G,H,I,J,K,L,M>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>,Parser<G>,Parser<H>,Parser<I>,Parser<J>,Parser<K>,Parser<L>,Parser<M>): Parser<[A,B,C,D,E,F,G,H,I,J,K,L,M]>;
declare function seq<A,B,C,D,E,F,G,H,I,J,K,L,M,N>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>,Parser<G>,Parser<H>,Parser<I>,Parser<J>,Parser<K>,Parser<L>,Parser<M>,Parser<N>): Parser<[A,B,C,D,E,F,G,H,I,J,K,L,M,N]>;
declare function seq<A,B,C,D,E,F,G,H,I,J,K,L,M,N,O>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>,Parser<G>,Parser<H>,Parser<I>,Parser<J>,Parser<K>,Parser<L>,Parser<M>,Parser<N>,Parser<O>): Parser<[A,B,C,D,E,F,G,H,I,J,K,L,M,N,O]>;
declare function seq<A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>,Parser<G>,Parser<H>,Parser<I>,Parser<J>,Parser<K>,Parser<L>,Parser<M>,Parser<N>,Parser<O>,Parser<P>): Parser<[A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P]>;
declare function seq<A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>,Parser<G>,Parser<H>,Parser<I>,Parser<J>,Parser<K>,Parser<L>,Parser<M>,Parser<N>,Parser<O>,Parser<P>,Parser<Q>): Parser<[A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q]>;
declare function seq<A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>,Parser<G>,Parser<H>,Parser<I>,Parser<J>,Parser<K>,Parser<L>,Parser<M>,Parser<N>,Parser<O>,Parser<P>,Parser<Q>,Parser<R>): Parser<[A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R]>;
declare function seq<A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>,Parser<G>,Parser<H>,Parser<I>,Parser<J>,Parser<K>,Parser<L>,Parser<M>,Parser<N>,Parser<O>,Parser<P>,Parser<Q>,Parser<R>,Parser<S>): Parser<[A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S]>;
declare function seq<A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>,Parser<G>,Parser<H>,Parser<I>,Parser<J>,Parser<K>,Parser<L>,Parser<M>,Parser<N>,Parser<O>,Parser<P>,Parser<Q>,Parser<R>,Parser<S>,Parser<T>): Parser<[A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T]>;
declare function seq<A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>,Parser<G>,Parser<H>,Parser<I>,Parser<J>,Parser<K>,Parser<L>,Parser<M>,Parser<N>,Parser<O>,Parser<P>,Parser<Q>,Parser<R>,Parser<S>,Parser<T>,Parser<U>): Parser<[A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U]>;
declare function seq<A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>,Parser<G>,Parser<H>,Parser<I>,Parser<J>,Parser<K>,Parser<L>,Parser<M>,Parser<N>,Parser<O>,Parser<P>,Parser<Q>,Parser<R>,Parser<S>,Parser<T>,Parser<U>,Parser<V>): Parser<[A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V]>;
declare function seq<A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>,Parser<G>,Parser<H>,Parser<I>,Parser<J>,Parser<K>,Parser<L>,Parser<M>,Parser<N>,Parser<O>,Parser<P>,Parser<Q>,Parser<R>,Parser<S>,Parser<T>,Parser<U>,Parser<V>,Parser<W>): Parser<[A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W]>;
declare function seq<A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>,Parser<G>,Parser<H>,Parser<I>,Parser<J>,Parser<K>,Parser<L>,Parser<M>,Parser<N>,Parser<O>,Parser<P>,Parser<Q>,Parser<R>,Parser<S>,Parser<T>,Parser<U>,Parser<V>,Parser<W>,Parser<X>): Parser<[A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X]>;
declare function seq<A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>,Parser<G>,Parser<H>,Parser<I>,Parser<J>,Parser<K>,Parser<L>,Parser<M>,Parser<N>,Parser<O>,Parser<P>,Parser<Q>,Parser<R>,Parser<S>,Parser<T>,Parser<U>,Parser<V>,Parser<W>,Parser<X>,Parser<Y>): Parser<[A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y]>;
declare function seq<A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>,Parser<G>,Parser<H>,Parser<I>,Parser<J>,Parser<K>,Parser<L>,Parser<M>,Parser<N>,Parser<O>,Parser<P>,Parser<Q>,Parser<R>,Parser<S>,Parser<T>,Parser<U>,Parser<V>,Parser<W>,Parser<X>,Parser<Y>,Parser<Z>): Parser<[A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z]>;

*/

// $FlowFixMe
const seq = (...as) =>
  async input => {
    const rs = []
    let s = input
    for (const a of as) {
      const r = await a(s)
      s = r[0]
      rs.push(r[1])
    }
    return [ s, rs ]
  }

module.exports = {
  Invalid,
  lit,
  pair,
  map,
  left,
  right,
  maybe,
  star,
  plus,
  times,
  range,
  regex,
  pred,
  either,
  then,
  seq
}
