import { ILike, In } from "typeorm";
import { AppDataSource } from "../db-source";
import { Language } from "../entities/language.entity";
import { paginate } from "../utils/paginate";
import { FilterOptions, getBooleanValueToFilter } from "./services.utils";

const repo = AppDataSource.getRepository(Language);

export class LanguageService {
	static async getAll(filters: FilterOptions<Language>) {
		const { page, limit, booleanQuery, ...rest } = filters;
		let isActiveFilter = getBooleanValueToFilter(booleanQuery);
		return await paginate(
			repo,
			{ page, limit },
			{
				order: { name: "ASC" },
				where: {
					...rest,
					...(rest.name ? { name: ILike(`%${rest.name}%`) } : {}),
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
		const language = await repo.findOneBy({ id });
		if (!language) throw new Error("Idioma no encontrado");
		return language;
	}
	static async create(data: Partial<Language>) {
		if (!data.name) throw new Error("El nombre es obligatorio");
		const exists = await repo.findOneBy({ name: data.name });
		if (exists) throw new Error("El idioma ya existe");

		const language = repo.create(data);
		return await repo.save(language);
	}

	static async update(id: number, data: Partial<Language>) {
		const language = await repo.findOneBy({ id });
		if (!language) throw new Error("No encontrado");

		Object.assign(language, data);
		return await repo.save(language);
	}

	static async toggleStatus(id: number) {
		const language = await repo.findOneBy({
			id,
		});
		if (!language) throw new Error("Idioma no encontrado");
		const result = await repo.update(id, { isActive: !language.isActive });
		if (result.affected === 0) throw new Error("Error al eliminar");
		return { message: "Actualizado con éxito" };
	}
}
