import { Entity, Column, ManyToOne } from "typeorm";
import { GlobalEntity } from "./utils/global.entity";
import { JobPosition } from "./job-position.entity";
import { Candidate } from "./candidate.entity";

@Entity({ name: "WorkExperience" })
export class WorkExperience extends GlobalEntity {
	@Column()
	company: string = "";
	@Column()
	startDate: Date = new Date();
	@Column()
	endDate: Date = new Date();
	@ManyToOne(() => JobPosition, (x) => x.id)
	jobPosition!: JobPosition;
	@ManyToOne(() => Candidate, (x) => x.workExperiences)
	candidate!: Candidate;
}
