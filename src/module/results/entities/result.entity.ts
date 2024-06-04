import { Tournament } from "src/module/tournament/entities/tournament.entity";
import { Player } from "src/module/players/entities/player.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Result {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Player, (player) => player.results)
    @JoinColumn({name: 'player_id'})
    player: Player

    @ManyToOne(() => Tournament, (tournament) => tournament.result)
    @JoinColumn({name: 'tournament_id'})
    tournament: Tournament

    @Column()
    result: number

    @DeleteDateColumn()
    deleteAt: Date

}
