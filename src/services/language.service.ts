import { AppDataSource } from "../db-source";
import { Language } from "../entities/language.entity";
import { paginate, PaginationOptions } from "../utils/paginate";

const repo = AppDataSource.getRepository(Language);

export class LanguageService {
	static async getAll(filter: Partial<Language> & PaginationOptions) {
		const { page, limit, ...rest } = filter;
		return await paginate(
			repo,
			{ page, limit },
			{
				order: { name: "ASC" },
				where: {
					...rest,
				},
			}
		);
	}
	static async getOne(id: number) {
		const language = await repo.findOneBy({ id });
		if (!language) throw new Error("Language not found");
		return language;
	}
	static async create(data: Partial<Language>) {
		const exists = await repo.findOneBy({ name: data.name });
		if (exists) throw new Error("Language already exists");

		const language = repo.create(data);
		return await repo.save(language);
	}

	static async update(id: number, data: Partial<Language>) {
		const language = await repo.findOneBy({ id });
		if (!language) throw new Error("Not found");

		Object.assign(language, data);
		return await repo.save(language);
	}
}
