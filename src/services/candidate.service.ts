import { AppDataSource } from "../db-source";

import { Candidate } from "../entities/candidate.entity";
import { Employee } from "../entities/employee.entity";
import { paginate, PaginationOptions } from "../utils/paginate";
import { EmployeeService } from "./employee.service";
const repo = AppDataSource.getRepository(Candidate);

export class CandidateService {
	static async getAll(filter: Partial<Candidate> & PaginationOptions) {
		const { page, limit, ...rest } = filter;
		return await paginate(
			repo,
			{ page, limit },
			{
				relations: [
					"applyingJobPosition",
					"proficiencies",
					"workExperiences",
					"recommendedBy",
					"spokenLanguages",
				],
				order: { name: "ASC" },
				where: {
					...rest,
				},
			}
		);
	}

	static async getOne(id: number) {
		const candidate = await repo.findOneBy({ id });
		if (!candidate) throw new Error("Candidato no encontrado");
		return candidate;
	}

	static async update(id: number, data: Partial<Candidate>) {
		const candidate = await this.getOne(id);
		if (!candidate) throw new Error("Candidato no encontrado");

		Object.assign(candidate, data);
		return await repo.save(candidate);
	}

	static async makeEmployee(id: number) {
		const candidate = await this.getOne(id);
		if (!candidate) throw new Error("Candidato no encontrado");

		await repo.update(id, {
			isEmployee: true,
			isActive: false,
		});

		await EmployeeService.create({
			cedula: candidate.cedula,
			name: candidate.name,
			startDate: new Date(),
			jobPosition: candidate.applyingJobPosition,
			department: candidate.department,
			salary: candidate.minExpectedSalary,
			candidateBackground: candidate,
		} as Employee);

		return candidate;
	}
}
