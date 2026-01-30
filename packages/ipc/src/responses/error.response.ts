import type { BaseResponse } from './base.response'

export interface ErrorResponse extends BaseResponse<null> {
	success: false
	error: string
}
