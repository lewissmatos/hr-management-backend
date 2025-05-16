import { AppDataSource } from "../db-source";

import { Candidate } from "../entities/candidate.entity";
import { Employee } from "../entities/employee.entity";
import { paginate, PaginationOptions } from "../utils/paginate";
import { EmployeeService } from "./employee.service";
import bcrypt from "bcrypt";
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
					"trainings",
				],
				order: { name: "ASC" },
				where: {
					...rest,
				},
			}
		);
	}

	static async getOne(id: number) {
		const candidate = await repo.findOne({
			where: { id },
			relations: [
				"applyingJobPosition",
				"proficiencies",
				"workExperiences",
				"recommendedBy",
				"spokenLanguages",
				"trainings",
			],
		});
		if (!candidate) throw new Error("Candidato no encontrado");
		return candidate;
	}

	static async getByCedula(cedula: string) {
		const candidate = await repo.findOne({
			where: { cedula },
			relations: [
				"applyingJobPosition",
				"proficiencies",
				"workExperiences",
				"recommendedBy",
				"spokenLanguages",
				"trainings",
			],
		});
		if (!candidate) throw new Error("Candidato no encontrado");
		return candidate;
	}

	static async checkPassword(cedula: string, password: string) {
		const candidate = await repo.findOne({
			where: { cedula },
			relations: [
				"applyingJobPosition",
				"proficiencies",
				"workExperiences",
				"recommendedBy",
				"spokenLanguages",
				"trainings",
			],
		});
		if (!candidate) throw new Error("Candidato no encontrado");
		const result = await bcrypt.compare(password, candidate.password);
		return result ? candidate : null;
	}

	static async create(data: Partial<Candidate>) {
		const exists = await repo.findOneBy({ cedula: data.cedula });
		if (exists) throw new Error("El candidato ya existe");
		if (!data.applyingJobPosition)
			throw new Error("El candidato no tiene puesto de trabajo");
		if (!data.password) throw new Error("El candidato no tiene contraseña");
		const { password } = data;
		const hashedPass = await bcrypt.hash(password, 10);

		const candidate = repo.create({
			...data,
			password: hashedPass,
		});
		return await repo.save(candidate);
	}

	static async update(id: number, data: Partial<Candidate>) {
		const candidate = await this.getOne(id);
		if (!candidate) throw new Error("Candidato no encontrado");

		Object.assign(candidate, data);
		//Check why it's not saving workExperiences
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
