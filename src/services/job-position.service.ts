import { AppDataSource } from "../db-source";
import { JobPosition } from "../entities/job-position.entity";
import { paginate, PaginationOptions } from "../utils/paginate";
import { JobPositionRiskLevels } from "../entities/utils/entity-utils";

const repo = AppDataSource.getRepository(JobPosition);
export class JobPositionService {
	static async getAll(pagination: PaginationOptions) {
		return await paginate(repo, pagination, {
			order: { name: "ASC" },
		});
	}

	static async getAvailable(pagination: PaginationOptions) {
		return await paginate(repo, pagination, {
			order: { name: "ASC" },
		});
	}

	static async getOne(id: number) {
		const jobPosition = await AppDataSource.getRepository(
			JobPosition
		).findOneBy({ id });
		if (!jobPosition) throw new Error("Puesto de trabajo no encontrado");
		return jobPosition;
	}

	static async create(data: Partial<JobPosition>) {
		const exists = await AppDataSource.getRepository(JobPosition).findOneBy({
			name: data.name,
		});
		if (exists) throw new Error("El puesto de trabajo ya existe");
		let riskLevels = Object.values(JobPositionRiskLevels);

		if (
			!riskLevels.includes(data.riskLevel!.toString() as JobPositionRiskLevels)
		) {
			throw new Error("Nivel de riesgo inválido");
		}
		const jobPosition = AppDataSource.getRepository(JobPosition).create(data);
		return await AppDataSource.getRepository(JobPosition).save(jobPosition);
	}

	static async update(id: number, data: Partial<JobPosition>) {
		const jobPosition = await this.getOne(id);
		if (!jobPosition) throw new Error("Puesto de trabajo no encontrado");

		await AppDataSource.getRepository(JobPosition).update(id, data);
		return { ...jobPosition, ...data };
	}

	static async toggleAvailability(id: number) {
		const jobPosition = await this.getOne(id);
		if (!jobPosition) throw new Error("Puesto de trabajo no encontrado");

		await AppDataSource.getRepository(JobPosition).update(id, {
			isAvailable: !jobPosition.isAvailable,
		});
		return { ...jobPosition, isAvailable: false };
	}
}
