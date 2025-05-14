import { PaginationOptions } from "../utils/paginate";

export const getBooleanValueToFilter = (isActive: string | undefined) => {
	let isActiveFilter: boolean | boolean[] | undefined;
	if (isActive === undefined) {
		isActiveFilter = undefined;
	} else if (isActive.includes(",")) {
		isActiveFilter = isActive.split(",").map((value) => value === "true"); // Convert to boolean array
	} else {
		isActiveFilter = isActive === "true";
	}

	return isActiveFilter;
};

export type FilterOptions<T> = {
	[key: string]: any;
	booleanQuery?: string | undefined;
	searchParam?: string | undefined;
} & Partial<T> &
	PaginationOptions;
