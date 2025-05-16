import {
	Entity,
	Column,
	OneToMany,
	ManyToMany,
	ManyToOne,
	JoinTable,
} from "typeorm";
import { GlobalEntity } from "./utils/global.entity";
import { JobPosition } from "./job-position.entity";
import { Proficiency } from "./proficiency.entity";
import { WorkExperience } from "./work-experience.entity";
import { Employee } from "./employee.entity";
import { Language } from "./language.entity";
import { Training } from "./training.entity";

@Entity({ name: "Candidate" })
export class Candidate extends GlobalEntity {
	@Column({ unique: true })
	cedula: string = "";
	@Column({ nullable: true })
	password: string = "";
	@Column()
	name: string = "";
	@ManyToOne(() => JobPosition)
	applyingJobPosition!: JobPosition;
	@ManyToMany(() => Proficiency)
	@JoinTable()
	proficiencies!: Proficiency[];
	@Column()
	department: string = "";
	@Column()
	minExpectedSalary: number = 0.0;
	@OneToMany(() => WorkExperience, (x) => x.candidate, { cascade: true })
	workExperiences!: WorkExperience[];
	@ManyToOne(() => Employee)
	recommendedBy!: Employee;
	@ManyToMany(() => Language)
	@JoinTable()
	spokenLanguages!: Language[];
	@ManyToMany(() => Training)
	@JoinTable()
	trainings!: Training[];
	@Column()
	isActive: boolean = true;
	@Column()
	isEmployee: boolean = false;
}
