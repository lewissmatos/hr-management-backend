import { AppDataSource } from "../db-source";

import { Employee } from "../entities/employee.entity";
import { paginate, PaginationOptions } from "../utils/paginate";
const repo = AppDataSource.getRepository(Employee);

export class EmployeeService {
	static async getAll(pagination: PaginationOptions) {
		return await paginate(repo, pagination, {}, [
			"jobPosition",
			"candidateBackground",
		]);
	}

	static async getOne(id: number) {
		const employee = await repo.findOneBy({ id });
		if (!employee) throw new Error("Employee not found");
		return employee;
	}

	static async create(data: Partial<Employee>) {
		const exists = await repo.findOneBy({ cedula: data.cedula });
		if (exists) throw new Error("Employee already exists");
		const employee = repo.create(data);
		return await repo.save(employee);
	}

	static async update(id: number, data: Partial<Employee>) {
		const employee = await this.getOne(id);
		if (!employee) throw new Error("Employee not found");

		Object.assign(employee, data);
		return await repo.save(employee);
	}
}
