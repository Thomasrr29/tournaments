import { Player } from "src/module/players/entities/player.entity";
import { Result } from "src/module/results/entities/result.entity";
import { Column, DeleteDateColumn, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Tournament {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name: string

    @ManyToMany(() => Player, (player) => player.tournaments)
    players: Player[]

    @OneToMany(() => Result, (result) => result.tournament)
    result: Result

    @DeleteDateColumn()
    deleteAt: Date
}
