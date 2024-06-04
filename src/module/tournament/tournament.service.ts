import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { Repository, In } from 'typeorm';
import { AddPlayerTournamentDto } from './dto/addPlayer.dto';
import { Player } from '../players/entities/player.entity';

@Injectable()
export class TournamentService {


  constructor(@InjectRepository(Tournament) private readonly tournamentRepository: Repository<Tournament>,
              @InjectRepository(Tournament) private readonly playerRepository: Repository<Player>){}

  async create(createTournamentDto: CreateTournamentDto) {

    const {name} = createTournamentDto

    let validation = await this.tournamentRepository.findOneBy({name})

    if(validation){
      throw new Error(`The name ${name} already exists, please try with other name`)
    } 

    const tournament = this.tournamentRepository.create(createTournamentDto)

    return await this.tournamentRepository.save(tournament)


  }

  async addPlayersForTournament(tournamentId: number, addPlayersIds: AddPlayerTournamentDto){

    try{

      //players IDS for add in the tournaments
      let {playersIds} = addPlayersIds

      let tournament = await this.tournamentRepository.findOne({where: {id: tournamentId}})
  
      if(!tournament){
        throw new NotFoundException(`The tournament with the id ${tournamentId} doesn't exists`)
      }
      //Array players search 
      let players = await this.playerRepository.find({where: {id: In(playersIds)}})
      console.log(players)
      

      //existence validation players IDS 
      if(players.length !== playersIds.length){
        throw new NotFoundException(`One or more players not found`)
      }
      
      tournament.players = players
  
      await this.tournamentRepository.save(tournament)
  
      return tournament
    } catch(error){
      console.error(`Error agregandolo ${error}`)
    }

  }

  async findAll(
    pagination: {page: number, limit: number},
    order: {orderField: string, direction: 'ASC'|'DESC'}
  ) {

    const {page, limit} = pagination
    const {orderField, direction} = order

    const tournaments = this.tournamentRepository.createQueryBuilder('tournament')
    .leftJoinAndSelect('tournament.players', 'players')
    .leftJoinAndSelect('tournament.result', 'result')
    .skip((page - 1) * limit)
    .take(limit)
    .orderBy(`tournament.${orderField}`, direction)

    const [results, total] = await tournaments.getManyAndCount()

    return {
      data: results,
      tournaments: total,
      page,
      limit,
    }
  }

  async findOneById(id: number) {
    return this.tournamentRepository.findOneBy({id});
  }

  async findBy(
    search: {searchValue: string , searchField: string},
  ) {

    const {searchValue, searchField} = search

    return this.tournamentRepository.createQueryBuilder('tournament')
    .where(`tournament.${searchField} Ilike :value`, {value: `${searchValue}`})
    //Ilike search
    .getManyAndCount()
    
  }

  async updateById(id: number, updateTournamentDto: UpdateTournamentDto) {
    return this.tournamentRepository.update(id, updateTournamentDto);
  }

  async removeById(id: number) {
    return this.tournamentRepository.softDelete(+id)
  }
}
