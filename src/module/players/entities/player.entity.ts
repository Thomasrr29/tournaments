import { Result } from "src/module/results/entities/result.entity";
import { Tournament } from "src/module/tournament/entities/tournament.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, MissingJoinColumnError, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Player {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(() => Tournament, (tournament) => tournament.players)
    @JoinTable()
    tournaments: Tournament[]

    @OneToMany(() => Result, (result) => result.player)
    results: Result[]

    @DeleteDateColumn()
    deleteAt: Date
    
}
