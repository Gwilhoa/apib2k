import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class General {
    @PrimaryColumn()
    key: string;

    @Column()
    value: string;
}