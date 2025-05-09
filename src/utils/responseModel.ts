export interface ApiResponse<T> {
	data: T | null;
	message: string;
	status: number;
}

export const createResponse = <T>(
	data: T | null,
	message: string,
	status: number
): ApiResponse<T> => {
	return {
		data,
		message,
		status,
	};
};
