import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class GlobalEntity {
	@PrimaryGeneratedColumn()
	id: number = 0;
	@Column()
	isActive: boolean = true;
	@Column()
	createdAt: Date = new Date();
}
