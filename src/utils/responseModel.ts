import { PaginationResult } from "./paginate";

export interface ApiResponse<T> {
	data: T | null;
	meta: PaginationResult<T> | null;
	message: string;
	status: number;
}

export const createResponse = <T>(
	message: string,
	status: number,
	data: T | null = null,
	meta: PaginationResult<T> | null = null
): ApiResponse<T> => {
	return {
		data,
		meta,
		message,
		status,
	};
};
