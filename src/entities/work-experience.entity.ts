import { Entity, Column, ManyToOne } from "typeorm";
import { GlobalEntity } from "./utils/global.entity";
import { JobPosition } from "./job-position.entity";
import { Candidate } from "./candidate.entity";

@Entity({ name: "WorkExperience" })
export class WorkExperience extends GlobalEntity {
	@Column()
	company: string = "";
	@Column()
	position: string = "";
	@Column({ nullable: true })
	startDate: Date = new Date();
	@Column({ nullable: true })
	endDate: Date = new Date();
	@Column({ nullable: true })
	salary: number = 0.0;
	@ManyToOne(() => Candidate, (x) => x.workExperiences)
	candidate!: Candidate;
}
