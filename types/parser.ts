import type Result from './result'

export type Parser<R> = (value: string) => Result<R>

export default Parser
