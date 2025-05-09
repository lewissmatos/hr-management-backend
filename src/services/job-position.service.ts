import { AppDataSource } from "../db-source";
import { JobPosition } from "../entities/job-position.entity";
import { paginate, PaginationOptions } from "../utils/paginate";

const repo = AppDataSource.getRepository(JobPosition);
export class JobPositionService {
	static async getAll(pagination: PaginationOptions) {
		return await paginate(repo, pagination, {}, ["requiredLanguages"]);
	}

	static async getAllActive(pagination: PaginationOptions) {
		return await paginate(repo, pagination, { isActive: true });
	}

	static async getOne(id: number) {
		const jobPosition = await AppDataSource.getRepository(
			JobPosition
		).findOneBy({ id });
		if (!jobPosition) throw new Error("Job position not found");
		return jobPosition;
	}

	static async create(data: Partial<JobPosition>) {
		const exists = await AppDataSource.getRepository(JobPosition).findOneBy({
			name: data.name,
		});
		if (exists) throw new Error("Job position already exists");

		const jobPosition = AppDataSource.getRepository(JobPosition).create(data);
		return await AppDataSource.getRepository(JobPosition).save(jobPosition);
	}

	static async update(id: number, data: Partial<JobPosition>) {
		const jobPosition = await this.getOne(id);
		if (!jobPosition) throw new Error("Job position not found");

		await AppDataSource.getRepository(JobPosition).update(id, data);
		return { ...jobPosition, ...data };
	}

	static async delete(id: number) {
		const jobPosition = await this.getOne(id);
		if (!jobPosition) throw new Error("Job position not found");

		await AppDataSource.getRepository(JobPosition).delete(id);
		return jobPosition;
	}
}
