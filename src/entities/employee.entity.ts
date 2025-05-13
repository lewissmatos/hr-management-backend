import {
	Entity,
	Column,
	OneToOne,
	ManyToOne,
	JoinTable,
	JoinColumn,
} from "typeorm";
import { GlobalEntity } from "./utils/global.entity";
import { JobPosition } from "./job-position.entity";
import { Candidate } from "./candidate.entity";
import { Departments } from "./utils/entity-utils";

@Entity({ name: "Employee" })
export class Employee extends GlobalEntity {
	@Column({ unique: true })
	cedula: string = "";
	@Column()
	name: string = "";
	@Column()
	startDate: Date = new Date();
	@ManyToOne(() => JobPosition)
	jobPosition!: JobPosition;
	@Column({ enum: Departments })
	department!: Departments;
	@Column()
	salary: number = 0.0;
	@OneToOne(() => Candidate, { nullable: true })
	@JoinColumn()
	candidateBackground!: Candidate;
}
