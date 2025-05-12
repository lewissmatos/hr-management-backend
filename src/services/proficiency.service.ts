import { AppDataSource } from "../db-source";
import { Proficiency } from "../entities/proficiency.entity";

const repo = AppDataSource.getRepository(Proficiency);

export class ProficiencyService {
	static async getAll() {
		return await repo.find({
			order: { id: "ASC" },
		});
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

	static async toggleStatus(id: number) {
		const proficiency = await repo.findOneBy({
			id,
		});
		if (!proficiency) throw new Error("Proficiency not found");
		const result = await repo.update(id, { isActive: !proficiency.isActive });
		if (result.affected === 0) throw new Error("Delete failed");
		return { message: "Deleted successfully" };
	}
}
