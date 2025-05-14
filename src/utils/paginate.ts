// src/utils/paginate.ts
import { FindOptionsOrder, FindOptionsWhere, Repository } from "typeorm";
import { GlobalEntity } from "../entities/utils/global.entity";
import { User } from "../entities/user.entity";

export interface PaginationOptions {
	page: number;
	limit: number;
}

export interface PaginationResult<T> {
	total: number;
	page: number;
	limit: number;
}

export async function paginate<T extends GlobalEntity>(
	repo: Repository<T>,
	pagination?: PaginationOptions,
	more?: {
		relations?: string[];
		where?: FindOptionsWhere<T> | FindOptionsWhere<T>[];
		order?: FindOptionsOrder<T>;
	}
): Promise<PaginationResult<T> & { data: T[] }> {
	const page = pagination?.page && pagination.page > 0 ? pagination.page : 1;

	const limit =
		pagination?.limit && pagination.limit > 0 ? pagination.limit : 50;

	const [data, total] = await repo.findAndCount({
		skip: (page - 1) * limit,
		take: limit,
		where: more?.where,
		relations: more?.relations,
		order: more?.order || ({ id: "ASC" } as FindOptionsOrder<T>),
	});

	return {
		data,
		total,
		page,
		limit,
	};
}
