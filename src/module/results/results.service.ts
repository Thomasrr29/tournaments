import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { Repository } from 'typeorm';
import { Player } from '../players/entities/player.entity';
import { Tournament } from '../tournament/entities/tournament.entity';

@Injectable()
export class ResultsService {


  constructor(@InjectRepository(Result) private readonly resultRepository:Repository<Result>,
              @InjectRepository(Player) private readonly playerRepository: Repository<Player>,
              @InjectRepository(Tournament) private readonly tournamentRepository: Repository<Tournament>){}


  async create(createResultDto: CreateResultDto) {
    
    const {playerId, tournamentId, result} = createResultDto

    const player = await this.playerRepository.findOne({where: {id: playerId }})

    if(!player){
      throw new NotFoundException(`The player eith the ID: ${playerId} wasn't found`)
    }

    const tournament = await this.tournamentRepository.findOne({where: {id: tournamentId}})

    if(!tournament){
      throw new NotFoundException(`The tournament with the ID: ${tournamentId} wasn't found`)
    }

    const newResult = this.resultRepository.create({
      result,
      player,
      tournament,
    })

    return this.resultRepository.save(newResult)
  }

  async findAll
  (

    //values for pagination
    pagination: {page: number, limit: number},
    //Values for order the results
    order: {orderField: string, direction: 'ASC'|'DESC'}
  ) 
  { 
    const {page, limit} = pagination
    const {orderField, direction} = order
 
    const result = this.resultRepository.createQueryBuilder('result')
    //Column Ratios
    .leftJoinAndSelect('result.player', 'player')
    .leftJoinAndSelect('result.tournament', 'tournament')
    .skip((page - 1) * limit)
    .take(limit)
    .orderBy(`result.${orderField}`, direction)


    const [results, total] = await result.getManyAndCount()

    return {
      data: results,
      count: total,
      page,
      limit
    }

  }

  async findOneById(id: number) {
    return await this.resultRepository.findOneBy({id});
  }

  async findBy(search: {searchValue: number, searchField: string}) {
    //search by specific field and value
    const {searchValue, searchField} = search

    const result = await this.resultRepository.find({
      where: {[searchField]: searchValue}
    })

    return result
    
  }
  
  async updateBy(id: number, updateResultDto: UpdateResultDto) {
    return await this.resultRepository.update(id, updateResultDto)
  }

  async removeById(id: number) {
    return await this.resultRepository.softDelete(+id);
  }
}
