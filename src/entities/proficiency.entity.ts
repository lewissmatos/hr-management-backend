import { Entity, Column } from "typeorm";
import { GlobalEntity } from "./global.entity";

@Entity({ name: "Proficiency" })
export class Proficiency extends GlobalEntity {
	@Column()
	description: string = "";
}
