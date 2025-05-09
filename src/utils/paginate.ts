// src/utils/paginate.ts
import {
	FindOneOptions,
	FindOptions,
	FindOptionsWhere,
	ObjectLiteral,
	Repository,
} from "typeorm";
import { GlobalEntity } from "../entities/global.entity";

export interface PaginationOptions {
	page: number;
	limit: number;
}

export interface PaginationResult<T> {
	data: T[];
	total: number;
	page: number;
	limit: number;
}

export async function paginate<T extends GlobalEntity>(
	repo: Repository<T>,
	pagination: PaginationOptions,
	where: FindOptionsWhere<T> | FindOptionsWhere<T>[] = {},
	relations: string[] = []
): Promise<PaginationResult<T>> {
	const page = pagination.page && pagination.page > 0 ? pagination.page : 1;
	const limit =
		pagination.limit && pagination.limit > 0 ? pagination.limit : 10;

	const [data, total] = await repo.findAndCount({
		skip: (page - 1) * limit,
		take: limit,
		order: { id: "ASC" } as any,
		where,
		relations,
	});

	return {
		data,
		total,
		page,
		limit,
	};
}
