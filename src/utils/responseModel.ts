import { PaginationResult } from "./paginate";

export interface ApiResponse<T> {
	data: T | null;
	message: string;
	status: number;
	meta: PaginationResult<T> | null;
}

export const createResponse = <T>(
	data: T | null,
	message: string,
	status: number,
	meta: PaginationResult<T> | null = null
): ApiResponse<T> => {
	return {
		data,
		message,
		status,
		meta,
	};
};
