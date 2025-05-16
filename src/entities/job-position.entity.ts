import { Entity, Column } from "typeorm";
import { GlobalEntity } from "./utils/global.entity";
import { JobPositionRiskLevels } from "./utils/entity-utils";
import { Language } from "./language.entity";

@Entity({ name: "JobPosition" })
export class JobPosition extends GlobalEntity {
	@Column()
	name: string = "";
	@Column({ nullable: true, length: 3200 })
	description: string = "";
	@Column({ enum: JobPositionRiskLevels })
	riskLevel!: JobPositionRiskLevels;
	@Column({ type: "float", default: 0.0 })
	minSalary: number = 0.0;
	@Column({ type: "float", default: 0.0 })
	maxSalary: number = 0;
	@Column({ nullable: true })
	department: string = "";
	@Column({ default: true, nullable: true })
	isAvailable: boolean = true;
}
