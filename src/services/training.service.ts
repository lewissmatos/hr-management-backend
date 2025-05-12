import { AppDataSource } from "../db-source";
import { Training } from "../entities/training.entity";
import { TrainingLevels } from "../entities/utils/entity-utils";

const repo = AppDataSource.getRepository(Training);

export class TrainingService {
	static async getAll() {
		return await repo.find();
	}

	static async getOne(id: number) {
		const training = await repo.findOneBy({ id });
		if (!training) throw new Error("Training not found");
		return training;
	}

	static async create(data: Partial<Training>) {
		const exists = await repo.findOneBy({ name: data.name });
		if (exists) throw new Error("Training already exists");

		let trainings = Object.values(TrainingLevels);

		if (!trainings.includes(data.level!.toString() as TrainingLevels)) {
			throw new Error("Invalid training level");
		}
		const training = repo.create(data);
		return await repo.save(training);
	}

	static async update(id: number, data: Partial<Training>) {
		const training = await repo.findOneBy({ id });
		if (!training) throw new Error("Not found");

		Object.assign(training, data);
		return await repo.save(training);
	}

	static async disable(id: number) {
		const result = await repo.update(id, { isActive: false });
		if (result.affected === 0) throw new Error("Disable failed");
		return { message: "Disable successfully" };
	}
}
