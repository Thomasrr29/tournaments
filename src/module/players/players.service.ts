import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlayersService {


  constructor(@InjectRepository(Player) private readonly playerRepository: Repository<Player>){}

  async create(createPlayerDto: CreatePlayerDto) {
  
    const {name} = createPlayerDto

    let validation = await this.playerRepository.findOneBy({name})

    if(validation){
      throw new Error(`The name ${name} already exists please try with other`)
    }

    const user = this.playerRepository.create(createPlayerDto)

    return this.playerRepository.save(user)


  }

  async findAll
  (
    pagination: {page: number, limit: number},
    order: {orderField: string, direction: 'ASC'|'DESC'}
  ) 
  {

    const {page, limit} = pagination
    const {orderField, direction} = order
 
    const result = this.playerRepository.createQueryBuilder('player')
    .leftJoinAndSelect('player.tournaments', 'tournament')
    .leftJoinAndSelect('player.results', 'results')
    .skip((page - 1) * limit)
    .take(limit)
    .orderBy(`player.${orderField}`, direction)
    
    const [results, total] = await result.getManyAndCount()

    return {
      data: results,
      count: total,
      page,
      limit
    }

  }

  async findBy(
    search: {searchValue: string , searchField: string},
  ) {

    const {searchValue, searchField} = search

    return this.playerRepository.createQueryBuilder('player')
    .where(`player.${searchField} Ilike :value`, {value: `${searchValue}`})
    .getManyAndCount()
    //Ilike comparison
  }

  async findOneById(id: number) {
    return await this.playerRepository.findOneBy({id});
  }

  async updateById(id: number, updatePlayerDto: UpdatePlayerDto) {
    return await this.playerRepository.update(id, updatePlayerDto);
  }

  async remove(id: number) {
    return await this.playerRepository.softDelete(+id);
  }
}
