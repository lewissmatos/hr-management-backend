import { Entity, Column } from "typeorm";
import { GlobalEntity } from "./global.entity";
import { TrainingLevels } from "./utils/entity-utils";

@Entity({ name: "Training" })
export class Training extends GlobalEntity {
	@Column()
	name: string = "";
	@Column({ enum: TrainingLevels })
	level!: TrainingLevels;
	@Column()
	startDate: Date = new Date();
	@Column()
	endDate: Date = new Date();
	@Column()
	institution: String = "";
}
