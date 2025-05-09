import {
	Entity,
	Column,
	JoinColumn,
	OneToMany,
	ManyToMany,
	ManyToOne,
} from "typeorm";
import { GlobalEntity } from "./global.entity";
import { JobPosition } from "./job-position.entity";
import { Proficiency } from "./proficiency.entity";
import { WorkExperience } from "./work-experience.entity";
import { Employee } from "./employee.entity";
import { Language } from "./language.entity";

@Entity({ name: "Candidate" })
export class Candidate extends GlobalEntity {
	@Column({ unique: true })
	cedula: string = "";
	@Column()
	name: string = "";
	@ManyToOne(() => JobPosition, (x) => x.id)
	@JoinColumn()
	applyingJobPosition!: JobPosition;
	@ManyToMany(() => Proficiency, (x) => x.id)
	proficiencies!: Proficiency[];
	@Column()
	department: string = "";
	@Column()
	minExpectedSalary: number = 0.0;
	@OneToMany(() => WorkExperience, (x) => x.id)
	workExperiencies!: WorkExperience[];
	@ManyToOne(() => Employee, (x) => x.id, {
		cascade: true,
	})
	@JoinColumn()
	recommendedBy!: Employee;
	@ManyToMany(() => Language, (x) => x.id)
	spokenLanguages!: Language[];
}
