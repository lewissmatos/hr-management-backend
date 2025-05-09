import { AppDataSource } from "../db-source";
import { Proficiency } from "../entities/proficiency.entity";

const repo = AppDataSource.getRepository(Proficiency);

export class ProficiencyService {
	static async getAll() {
		return await repo.find();
	}

	static async getOne(id: number) {
		const proficiency = await repo.findOneBy({ id });
		if (!proficiency) throw new Error("Proficiency not found");
		return proficiency;
	}

	static async create(data: Partial<Proficiency>) {
		const exists = await repo.findOneBy({ description: data.description });
		if (exists) throw new Error("Proficiency already exists");

		const proficiency = repo.create(data);
		return await repo.save(proficiency);
	}

	static async update(id: number, data: Partial<Proficiency>) {
		const proficiency = await repo.findOneBy({ id });
		if (!proficiency) throw new Error("Not found");

		Object.assign(proficiency, data);
		return await repo.save(proficiency);
	}

	static async delete(id: number) {
		const result = await repo.delete(id);
		if (result.affected === 0) throw new Error("Delete failed");
		return { message: "Deleted successfully" };
	}
}
