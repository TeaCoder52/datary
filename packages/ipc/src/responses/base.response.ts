export interface BaseResponse<T = any> {
	success: boolean
	data?: T
	error?: string
}
