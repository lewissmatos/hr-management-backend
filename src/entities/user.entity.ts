import { Entity, Column, OneToOne } from "typeorm";
import { GlobalEntity } from "./global.entity";
import { Employee } from "./employee.entity";

@Entity({ name: "User" })
export class User extends GlobalEntity {
	@OneToOne(() => Employee, (employee) => employee.id)
	employeeData!: Employee;
	@Column()
	password: string = "";
	@Column()
	isActive: boolean = true;
}
