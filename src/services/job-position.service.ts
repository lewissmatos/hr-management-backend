import { AppDataSource } from "../db-source";
import { JobPosition } from "../entities/job-position.entity";
import { paginate, PaginationOptions } from "../utils/paginate";
import { JobPositionRiskLevels } from "../entities/utils/entity-utils";
import { ILike, In, LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { FilterOptions, getBooleanValueToFilter } from "./services.utils";
import { Candidate } from "../entities/candidate.entity";

const repo = AppDataSource.getRepository(JobPosition);
const candidatesRepo = AppDataSource.getRepository(Candidate);
export class JobPositionService {
	static async getAll(filters: FilterOptions<JobPosition>) {
		const {
			page,
			limit,
			name,
			booleanQuery,
			minSalary,
			maxSalary,
			riskLevels,
			description,
		} = filters;
		let isAvailableFilter = getBooleanValueToFilter(booleanQuery);
		return await paginate(
			repo,
			{ page, limit },
			{
				where: {
					...(name ? { name: ILike(`%${name}%`) } : {}),
					...(description ? { name: ILike(`%${description}%`) } : {}),
					...(isAvailableFilter !== undefined
						? Array.isArray(isAvailableFilter)
							? { isAvailable: In(isAvailableFilter) }
							: { isAvailable: isAvailableFilter }
						: {}),
					...(minSalary ? { minSalary: MoreThanOrEqual(minSalary) } : {}),
					...(maxSalary ? { maxSalary: LessThanOrEqual(maxSalary) } : {}),
					...(riskLevels ? { riskLevel: In(riskLevels) } : {}),
				},
				order: { name: "ASC" },
			}
		);
	}

	static async getOne(id: number) {
		const jobPosition = await AppDataSource.getRepository(
			JobPosition
		).findOneBy({ id });
		if (!jobPosition) throw new Error("Puesto de trabajo no encontrado");
		return jobPosition;
	}

	static async getCandidatesCount(id: number) {
		const candidatesCount = await candidatesRepo.count({
			where: {
				applyingJobPosition: { id },
				isEmployee: false,
				isActive: true,
			},
		});
		return candidatesCount;
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
			...jobPosition,
			isAvailable: !jobPosition.isAvailable,
		});
		return { ...jobPosition, isAvailable: false };
	}
}
