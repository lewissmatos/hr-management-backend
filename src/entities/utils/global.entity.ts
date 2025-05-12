import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
} from "typeorm";

@Entity()
export class GlobalEntity {
	@PrimaryGeneratedColumn()
	id: number = 0;
	@CreateDateColumn({ default: () => "CURRENT_TIMESTAMP" })
	createdAt!: Date;
	@Column({ default: true })
	isActive: boolean = true;
}
