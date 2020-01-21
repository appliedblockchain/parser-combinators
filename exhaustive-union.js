// @flow

const exhaustive = require('./exhaustive')
const Invalid = require('./invalid')
const maybe = require('./maybe')

/*::

import type { Parser } from './types/parser'

declare function union<A>(Parser<A>): Parser<A>;
declare function union<A,B>(Parser<A>,Parser<B>): Parser<A|B>;
declare function union<A,B,C>(Parser<A>,Parser<B>,Parser<C>): Parser<A|B|C>;
declare function union<A,B,C,D>(Parser<A>,Parser<B>,Parser<C>,Parser<D>): Parser<A|B|C|D>;
declare function union<A,B,C,D,E>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>): Parser<A|B|C|D|E>;
declare function union<A,B,C,D,E,F>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>): Parser<A|B|C|D|E|F>;
declare function union<A,B,C,D,E,F,G>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>,Parser<G>): Parser<A|B|C|D|E|F|G>;
declare function union<A,B,C,D,E,F,G,H>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>,Parser<G>,Parser<H>): Parser<A|B|C|D|E|F|G|H>;
declare function union<A,B,C,D,E,F,G,H,I>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>,Parser<G>,Parser<H>,Parser<I>): Parser<A|B|C|D|E|F|G|H|I>;
declare function union<A,B,C,D,E,F,G,H,I,J>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>,Parser<G>,Parser<H>,Parser<I>,Parser<J>): Parser<A|B|C|D|E|F|G|H|I|J>;
declare function union<A,B,C,D,E,F,G,H,I,J,K>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>,Parser<G>,Parser<H>,Parser<I>,Parser<J>,Parser<K>): Parser<A|B|C|D|E|F|G|H|I|J|K>;
declare function union<A,B,C,D,E,F,G,H,I,J,K,L>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>,Parser<G>,Parser<H>,Parser<I>,Parser<J>,Parser<K>,Parser<L>): Parser<A|B|C|D|E|F|G|H|I|J|K|L>;
declare function union<A,B,C,D,E,F,G,H,I,J,K,L,M>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>,Parser<G>,Parser<H>,Parser<I>,Parser<J>,Parser<K>,Parser<L>,Parser<M>): Parser<A|B|C|D|E|F|G|H|I|J|K|L|M>;
declare function union<A,B,C,D,E,F,G,H,I,J,K,L,M,N>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>,Parser<G>,Parser<H>,Parser<I>,Parser<J>,Parser<K>,Parser<L>,Parser<M>,Parser<N>): Parser<A|B|C|D|E|F|G|H|I|J|K|L|M|N>;
declare function union<A,B,C,D,E,F,G,H,I,J,K,L,M,N,O>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>,Parser<G>,Parser<H>,Parser<I>,Parser<J>,Parser<K>,Parser<L>,Parser<M>,Parser<N>,Parser<O>): Parser<A|B|C|D|E|F|G|H|I|J|K|L|M|N|O>;
declare function union<A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>,Parser<G>,Parser<H>,Parser<I>,Parser<J>,Parser<K>,Parser<L>,Parser<M>,Parser<N>,Parser<O>,Parser<P>): Parser<A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P>;
declare function union<A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>,Parser<G>,Parser<H>,Parser<I>,Parser<J>,Parser<K>,Parser<L>,Parser<M>,Parser<N>,Parser<O>,Parser<P>,Parser<Q>): Parser<A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q>;
declare function union<A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>,Parser<G>,Parser<H>,Parser<I>,Parser<J>,Parser<K>,Parser<L>,Parser<M>,Parser<N>,Parser<O>,Parser<P>,Parser<Q>,Parser<R>): Parser<A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R>;
declare function union<A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>,Parser<G>,Parser<H>,Parser<I>,Parser<J>,Parser<K>,Parser<L>,Parser<M>,Parser<N>,Parser<O>,Parser<P>,Parser<Q>,Parser<R>,Parser<S>): Parser<A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S>;
declare function union<A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>,Parser<G>,Parser<H>,Parser<I>,Parser<J>,Parser<K>,Parser<L>,Parser<M>,Parser<N>,Parser<O>,Parser<P>,Parser<Q>,Parser<R>,Parser<S>,Parser<T>): Parser<A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T>;
declare function union<A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>,Parser<G>,Parser<H>,Parser<I>,Parser<J>,Parser<K>,Parser<L>,Parser<M>,Parser<N>,Parser<O>,Parser<P>,Parser<Q>,Parser<R>,Parser<S>,Parser<T>,Parser<U>): Parser<A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U>;
declare function union<A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>,Parser<G>,Parser<H>,Parser<I>,Parser<J>,Parser<K>,Parser<L>,Parser<M>,Parser<N>,Parser<O>,Parser<P>,Parser<Q>,Parser<R>,Parser<S>,Parser<T>,Parser<U>,Parser<V>): Parser<A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V>;
declare function union<A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>,Parser<G>,Parser<H>,Parser<I>,Parser<J>,Parser<K>,Parser<L>,Parser<M>,Parser<N>,Parser<O>,Parser<P>,Parser<Q>,Parser<R>,Parser<S>,Parser<T>,Parser<U>,Parser<V>,Parser<W>): Parser<A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W>;
declare function union<A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>,Parser<G>,Parser<H>,Parser<I>,Parser<J>,Parser<K>,Parser<L>,Parser<M>,Parser<N>,Parser<O>,Parser<P>,Parser<Q>,Parser<R>,Parser<S>,Parser<T>,Parser<U>,Parser<V>,Parser<W>,Parser<X>): Parser<A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X>;
declare function union<A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>,Parser<G>,Parser<H>,Parser<I>,Parser<J>,Parser<K>,Parser<L>,Parser<M>,Parser<N>,Parser<O>,Parser<P>,Parser<Q>,Parser<R>,Parser<S>,Parser<T>,Parser<U>,Parser<V>,Parser<W>,Parser<X>,Parser<Y>): Parser<A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y>;
declare function union<A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z>(Parser<A>,Parser<B>,Parser<C>,Parser<D>,Parser<E>,Parser<F>,Parser<G>,Parser<H>,Parser<I>,Parser<J>,Parser<K>,Parser<L>,Parser<M>,Parser<N>,Parser<O>,Parser<P>,Parser<Q>,Parser<R>,Parser<S>,Parser<T>,Parser<U>,Parser<V>,Parser<W>,Parser<X>,Parser<Y>,Parser<Z>): Parser<A|B|C|D|E|F|G|H|I|J|K|L|M|N|O|P|Q|R|S|T|U|V|W|X|Y|Z>;

*/

// $FlowFixMe
const exhaustiveUnion =
  (...as /*: Parser<any>[] */) =>
    async (input /*: string */) => {
      for (const a of as) {
        const [ s, r ] = await maybe(exhaustive(a))(input)
        if (typeof r !== undefined) {
          return [ s, r ]
        }
      }
      throw new Invalid(input)
    }

module.exports = exhaustiveUnion
