import { Entity, Column } from "typeorm";
import { GlobalEntity } from "./global.entity";

@Entity({ name: "Language" })
export class Language extends GlobalEntity {
	@Column()
	name: string = "";
}
