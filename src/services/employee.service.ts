import { ILike, LessThanOrEqual, MoreThanOrEqual } from "typeorm";
import { AppDataSource } from "../db-source";

import { Employee } from "../entities/employee.entity";
import { paginate, PaginationOptions } from "../utils/paginate";
import { FilterOptions } from "./services.utils";
const repo = AppDataSource.getRepository(Employee);

export class EmployeeService {
	static async getAll(filters: FilterOptions<Employee>) {
		const {
			page,
			limit,
			searchParam,
			startDate,
			startSalary,
			endSalary,
			...rest
		} = filters;

		const searchConditions =
			searchParam == undefined
				? []
				: [
						{ cedula: ILike(`%${searchParam}%`) },
						{ name: ILike(`%${searchParam}%`) },
						{ department: ILike(`%${searchParam}%`) },
						{ jobPosition: { name: ILike(`%${searchParam}%`) } },
				  ];
		return await paginate(
			repo,
			{ page, limit },
			{
				relations: ["jobPosition", "candidateBackground"],
				where: [
					rest,
					...(searchConditions as any),
					{
						...(startDate ? { startDate: MoreThanOrEqual(startDate) } : {}),
					},
					{
						...(startSalary ? { salary: MoreThanOrEqual(startSalary) } : {}),
						...(endSalary ? { salary: LessThanOrEqual(endSalary) } : {}),
					},
				],
				order: { name: "ASC" },
			}
		);
	}

	static async getOne(id: number) {
		const employee = await repo.findOne({
			where: { id },
			relations: ["jobPosition", "candidateBackground"],
		});
		if (!employee) throw new Error("Empleado no encontrado");
		return employee;
	}

	static async create(data: Partial<Employee>) {
		const exists = await repo.findOneBy({ cedula: data.cedula });
		if (exists) throw new Error("El empleado ya existe");
		const employee = repo.create(data);
		return await repo.save(employee);
	}

	static async update(id: number, data: Partial<Employee>) {
		const employee = await this.getOne(id);
		if (!employee) throw new Error("Empleado no encontrado");

		//Check if the cedula already exists
		const cedulaExists = await repo.findOneBy({ cedula: data.cedula });
		if (cedulaExists && cedulaExists.id !== id) {
			throw new Error("La cédula ya existe");
		}

		//Check if the candidate background is already assigned
		const candidateBackgroundExists = await repo.findOneBy({
			candidateBackground: data.candidateBackground,
		});
		if (candidateBackgroundExists && candidateBackgroundExists.id !== id) {
			throw new Error("El fondo de candidato ya está asignado");
		}

		Object.assign(employee, data);
		return await repo.save(employee);
	}
}
