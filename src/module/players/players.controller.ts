import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { ApiOperation, ApiResponse, ApiQuery, ApiParam, ApiTags } from '@nestjs/swagger';


@ApiTags('players')
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post('/create')
  @ApiOperation({ summary: "Create a new player" })
  @ApiResponse({ status: 201, description: 'Player created successfully' })
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.create(createPlayerDto);
  }

  @Get('/find/all')
  @ApiOperation({ summary: "Get all players with pagination and ordering" })
  @ApiResponse({ status: 200, description: 'Return all players' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'orderField', required: false, example: 'name' })
  @ApiQuery({ name: 'direction', required: false, enum: ['ASC', 'DESC'], example: 'ASC' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('orderField') orderField: string,
    @Query('direction') direction: 'ASC'|'DESC'
  ) {
    const pagination = { page, limit };
    const order = { orderField, direction };
    return await this.playersService.findAll(pagination, order);
  }

  @Get('/find/id/:id')
  @ApiOperation({ summary: "Get player by ID" })
  @ApiResponse({ status: 200, description: 'Return player by ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the player' })
  async findOneById(@Param('id') id: string) {
    return await this.playersService.findOneById(+id);
  }

  @Get('/find/by')
  @ApiOperation({ summary: "Find player by field and value" })
  @ApiResponse({ status: 200, description: 'Return player by search field and value' })
  @ApiQuery({ name: 'searchField', required: true, example: 'name' })
  @ApiQuery({ name: 'searchValue', required: true, example: 'John Doe' })
  async findBy(
    @Query('searchField') searchField: string,
    @Query('searchValue') searchValue: string,
  ) {
    const search = { searchField, searchValue };
    return await this.playersService.findBy(search);
  }

  @Patch('/update/id/:id')
  @ApiOperation({ summary: "Update player by ID" })
  @ApiResponse({ status: 200, description: 'Player updated successfully' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the player' })
  async update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return await this.playersService.updateById(+id, updatePlayerDto);
  }

  @Delete('/delete/id/:id')
  @ApiOperation({ summary: "Delete player by ID" })
  @ApiResponse({ status: 200, description: 'Player deleted successfully' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the player' })
  async remove(@Param('id') id: string) {
    return await this.playersService.remove(+id);
  }
}
