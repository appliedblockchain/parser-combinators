import type { Result } from './result.js'

export type Parser<R> = (value: string) => Result<R>
