import { AppDataSource } from "../db-source";
import { Language } from "../entities/language.entity";

const repo = AppDataSource.getRepository(Language);

export class LanguageService {
	static async getAll() {
		return await repo.find();
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
}
