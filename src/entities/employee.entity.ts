import { Entity, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { GlobalEntity } from "./global.entity";
import { JobPosition } from "./job-position.entity";
import { Candidate } from "./candidate.entity";

@Entity({ name: "Employee" })
export class Employee extends GlobalEntity {
	@Column({ unique: true })
	cedula: string = "";
	@Column()
	name: string = "";
	@Column()
	startDate: Date = new Date();
	@ManyToOne(() => JobPosition, (x) => x.id, {
		cascade: true,
	})
	@JoinColumn()
	jobPosition!: JobPosition;
	@Column()
	department: string = "";
	@Column()
	salary: number = 0.0;
	@OneToOne(() => Candidate, (x) => x.id, {
		cascade: true,
	})
	@JoinColumn()
	candidateBackground!: Candidate;
}
