import { Entity, Column, OneToOne } from "typeorm";
import { GlobalEntity } from "./utils/global.entity";
import { Employee } from "./employee.entity";

@Entity({ name: "User" })
export class User extends GlobalEntity {
	@Column({ unique: true })
	username: string = "";
	@Column()
	password: string = "";
}
