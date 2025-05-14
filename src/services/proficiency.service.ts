import { ILike, In } from "typeorm";
import { AppDataSource } from "../db-source";
import { Proficiency } from "../entities/proficiency.entity";
import { paginate, PaginationOptions } from "../utils/paginate";
import { FilterOptions, getBooleanValueToFilter } from "./services.utils";

const repo = AppDataSource.getRepository(Proficiency);

export class ProficiencyService {
	static async getAll(filters: FilterOptions<Proficiency>) {
		const { page, limit, description, booleanQuery } = filters;
		let isActiveFilter = getBooleanValueToFilter(booleanQuery);
		return await paginate(
			repo,
			{ page, limit },
			{
				order: { description: "ASC" },
				where: {
					...(description ? { description: ILike(`%${description}%`) } : {}),
					...(isActiveFilter !== undefined
						? Array.isArray(isActiveFilter)
							? { isActive: In(isActiveFilter) }
							: { isActive: isActiveFilter }
						: {}),
				},
			}
		);
	}

	static async getOne(id: number) {
		const proficiency = await repo.findOneBy({ id });
		if (!proficiency) throw new Error("Competencia no encontrada");
		return proficiency;
	}

	static async create(data: Partial<Proficiency>) {
		const exists = await repo.findOneBy({ description: data.description });
		if (exists) throw new Error("La competencia ya existe");

		const proficiency = repo.create(data);
		return await repo.save(proficiency);
	}

	static async update(id: number, data: Partial<Proficiency>) {
		const proficiency = await repo.findOneBy({ id });
		if (!proficiency) throw new Error("No encontrado");

		Object.assign(proficiency, data);
		return await repo.save(proficiency);
	}

	static async toggleStatus(id: number) {
		const proficiency = await repo.findOneBy({
			id,
		});
		if (!proficiency) throw new Error("Competencia no encontrada");
		const result = await repo.update(id, { isActive: !proficiency.isActive });
		if (result.affected === 0) throw new Error("Error al eliminar");
		return { message: "Actualizado con éxito" };
	}
}
