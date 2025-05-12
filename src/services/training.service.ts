import { AppDataSource } from "../db-source";
import { Training } from "../entities/training.entity";
import { TrainingLevels } from "../entities/utils/entity-utils";
import { paginate, PaginationOptions } from "../utils/paginate";

const repo = AppDataSource.getRepository(Training);

export class TrainingService {
	static async getAll(filters: Partial<Training> & PaginationOptions) {
		const { page, limit, ...rest } = filters;
		return await paginate(
			repo,
			{ page, limit },
			{
				where: {
					...rest,
				},
				order: { name: "ASC" },
			}
		);
	}

	static async getOne(id: number) {
		const training = await repo.findOneBy({ id });
		if (!training) throw new Error("Capacitación no encontrada");
		return training;
	}

	static async create(data: Partial<Training>) {
		const exists = await repo.findOneBy({ name: data.name });
		if (exists) throw new Error("La capacitación ya existe");

		let trainings = Object.values(TrainingLevels);

		if (!trainings.includes(data.level!.toString() as TrainingLevels)) {
			throw new Error("Nivel de capacitación inválido");
		}
		const training = repo.create(data);
		return await repo.save(training);
	}

	static async update(id: number, data: Partial<Training>) {
		const training = await repo.findOneBy({ id });
		if (!training) throw new Error("No encontrado");

		Object.assign(training, data);
		return await repo.save(training);
	}

	static async disable(id: number) {
		const result = await repo.update(id, { isActive: false });
		if (result.affected === 0) throw new Error("Error al desactivar");
		return { message: "Actualizado con éxito" };
	}
}
