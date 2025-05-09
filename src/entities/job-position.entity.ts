import { Entity, Column, OneToMany, ManyToMany } from "typeorm";
import { GlobalEntity } from "./global.entity";
import { JobPositionRiskLevels } from "./utils/entity-utils";
import { Language } from "./language.entity";

@Entity({ name: "JobPosition" })
export class JobPosition extends GlobalEntity {
	@Column()
	name: string = "";
	@Column({ enum: JobPositionRiskLevels })
	riskLevel!: JobPositionRiskLevels;
	@Column({ type: "float", default: 0.0 })
	minSalary: number = 0.0;
	@Column({ type: "float", default: 0.0 })
	maxSalary: number = 0;
	@Column()
	isActive: boolean = true;
	@ManyToMany(() => Language, (x) => x.id)
	requiredLanguages!: Language[];
}
