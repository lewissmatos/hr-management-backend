import { Entity, Column } from "typeorm";
import { GlobalEntity } from "./utils/global.entity";

@Entity({ name: "User" })
export class User extends GlobalEntity {
	@Column({ unique: true })
	username: string = "";
	@Column()
	password: string = "";
}
