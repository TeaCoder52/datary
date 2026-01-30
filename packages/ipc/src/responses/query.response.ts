import type { BaseResponse } from './base.response'

export interface QueryResponse<T = any> extends BaseResponse<T[]> {}
