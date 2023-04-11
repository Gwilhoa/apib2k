import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class General {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: "Bitume2000"})
    season: string;
}