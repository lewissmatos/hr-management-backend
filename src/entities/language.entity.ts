import { Entity, Column, ManyToMany } from "typeorm";
import { GlobalEntity } from "./utils/global.entity";
import { JobPosition } from "./job-position.entity";

@Entity({ name: "Language" })
export class Language extends GlobalEntity {
	@Column({ unique: true })
	name: string = "";
}
