import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { AddPlayerTournamentDto } from './dto/addPlayer.dto';
import { ApiResponse, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('tournaments')
@Controller('tournaments')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  
  // POST /create
  @Post('/create')
  @ApiOperation({ summary: "Create a new tournament" })
  @ApiResponse({ status: 201, description: 'Tournament created successfully' })
  create(
  @Body() createTournamentDto: CreateTournamentDto) {
    return this.tournamentService.create(createTournamentDto);
  }

  // PATCH /add/players/tournament/:id
  @Patch('add/players/tournament/:id')
  @ApiOperation({ summary: "Add players to a tournament" })
  @ApiResponse({ status: 200, description: 'Players added to the tournament' })
  addPlayers(
    @Param('id') id: number,
    @Body() addPlayerTournamentDto: AddPlayerTournamentDto,
  ) {
    return this.tournamentService.addPlayersForTournament(id, addPlayerTournamentDto);
  }

  // GET /find/all
  @Get('/find/all')
  @ApiOperation({ summary: "Find all tournaments" })
  @ApiResponse({ status: 200, description: 'Array of tournaments' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('orderField') orderField: string,
    @Query('direction') direction: 'ASC' | 'DESC' = 'ASC',
  ) {
    const search = { page, limit };
    const order = { orderField, direction };

    return await this.tournamentService.findAll(search, order);
  }

  // GET /find/id/:id
  @Get('/find/id/:id')
  @ApiOperation({ summary: "Find a tournament by ID" })
  @ApiResponse({ status: 200, description: 'Tournament object' })
  async findById(@Param('id') id: string) {
    return await this.tournamentService.findOneById(+id);
  }

  // GET /find/by
  @Get('/find/by')
  @ApiOperation({ summary: "Find tournaments by specific criteria" })
  @ApiResponse({ status: 200, description: 'Array of tournaments matching criteria' })
  async findOne(
    @Query('searchField') searchField: string,
    @Query('searchValue') searchValue: string,
  ) {
    const search = { searchField, searchValue };
    return await this.tournamentService.findBy(search);
  }

  // PATCH /update/id/:id
  @Patch('/update/id/:id')
  @ApiOperation({ summary: "Update a tournament" })
  @ApiResponse({ status: 200, description: 'Updated tournament object' })
  async update(@Param('id') id: number, @Body() updateTournamentDto: UpdateTournamentDto) {
    return await this.tournamentService.updateById(+id, updateTournamentDto);
  }

  // DELETE /remove/id/:id
  @Delete('/remove/id/:id')
  @ApiOperation({ summary: "Remove a tournament" })
  @ApiResponse({ status: 200, description: 'Success message' })
  async remove(@Param('id') id: string) {
    return await this.tournamentService.removeById(+id);
  }
}
