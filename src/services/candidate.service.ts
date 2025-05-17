import { AppDataSource } from "../db-source";

import { Candidate } from "../entities/candidate.entity";
import { Employee } from "../entities/employee.entity";
import { paginate, PaginationOptions } from "../utils/paginate";
import { EmployeeService } from "./employee.service";
import bcrypt from "bcrypt";
import { FilterOptions } from "./services.utils";
import { ILike, LessThanOrEqual, MoreThanOrEqual } from "typeorm";
const repo = AppDataSource.getRepository(Candidate);

export class CandidateService {
	static async getAll(filters: FilterOptions<Candidate>) {
		const {
			page,
			limit,
			proficiencyDescription,
			trainingName,
			languageName,
			applyingJobPositionName,
			searchParam,
			startApplyingDate,
			endApplyingDate,
			startSalary,
			endSalary,
			department,
			recommendedByName,
			...rest
		} = filters;

		const searchConditions =
			searchParam == undefined
				? []
				: [
						{ cedula: ILike(`%${searchParam}%`) },
						{ name: ILike(`%${searchParam}%`) },
				  ];

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
				where: [
					rest,
					...(searchConditions as any),
					{
						...(startApplyingDate
							? { createdAt: MoreThanOrEqual(startApplyingDate) }
							: {}),
						...(endApplyingDate
							? { createdAt: LessThanOrEqual(endApplyingDate) }
							: {}),
					},
					{
						...(startSalary ? { salary: MoreThanOrEqual(startSalary) } : {}),
						...(endSalary ? { salary: LessThanOrEqual(endSalary) } : {}),
					},
					{
						...(proficiencyDescription
							? {
									proficiencies: {
										description: ILike(`%${proficiencyDescription}%`),
									},
							  }
							: {}),
					},
					{
						...(trainingName
							? { trainings: { name: ILike(`%${trainingName}%`) } }
							: {}),
					},
					{
						...(languageName
							? { spokenLanguages: { name: ILike(`%${languageName}%`) } }
							: {}),
					},
					{
						...(applyingJobPositionName
							? {
									applyingJobPosition: {
										name: ILike(`%${applyingJobPositionName}%`),
									},
							  }
							: {}),
					},
					{
						...(department
							? {
									applyingJobPosition: {
										department: ILike(`%${department}%`),
									},
							  }
							: {}),
					},
					{
						...(recommendedByName
							? {
									recommendedBy: {
										name: ILike(`%${recommendedByName}%`),
									},
							  }
							: {}),
					},
				],
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

		let message = "";
		if (!candidate) {
			message = "NO_MATTER";
		} else if (candidate.isEmployee) {
			message = "DENY";
		} else if (!candidate.isActive) {
			message = "DENY";
		} else {
			message = "PENDING";
		}
		return {
			candidate,
			message,
		};
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
		if (candidate.isEmployee || !candidate.isActive)
			throw new Error("Candidato ya es empleado");
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
		console.log(candidate);
		if (candidate.isEmployee || !candidate.isActive)
			throw new Error("Candidato ya es empleado");
		Object.assign(candidate, data);
		return await repo.save(candidate);
	}

	static async makeEmployee(id: number, salary?: number) {
		const candidate = await this.getOne(id);
		if (!candidate) throw new Error("Candidato no encontrado");

		Object.assign(candidate, {
			...candidate,
			isEmployee: true,
			isActive: false,
		});

		await repo.save(candidate);

		await EmployeeService.create({
			cedula: candidate.cedula,
			name: candidate.name,
			startDate: new Date(),
			jobPosition: candidate.applyingJobPosition,
			department: candidate.applyingJobPosition.department,
			salary: salary || candidate.minExpectedSalary,
			candidateBackground: candidate,
		} as Employee);

		return candidate;
	}
}
