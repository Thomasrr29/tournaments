import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ResultsService } from './results.service';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('results')
@Controller('results')
export class ResultsController {
  constructor(private readonly resultsService: ResultsService) {}

  @Post('/create')
  @ApiOperation({ summary: "Create a new result" })
  @ApiResponse({ status: 201, description: 'Result created successfully' })
  create(@Body() createResultDto: CreateResultDto) {
    return this.resultsService.create(createResultDto);
  }

  @Get('/find/all')
  @ApiOperation({ summary: "Get all results with pagination and ordering" })
  @ApiResponse({ status: 200, description: 'Return all results' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'orderField', required: false, example: 'id' })
  @ApiQuery({ name: 'direction', required: false, enum: ['ASC', 'DESC'], example: 'ASC' })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('orderField') orderField: string,
    @Query('direction') direction: 'ASC'|'DESC'
  ) {
    const search = { page, limit };
    const order = { orderField, direction };
    return await this.resultsService.findAll(search, order);
  }

  @Get('/find/id/:id')
  @ApiOperation({ summary: "Get result by ID" })
  @ApiResponse({ status: 200, description: 'Return result by ID' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the result' })
  async findOnebyId(@Param('id') id: string) {
    return this.resultsService.findOneById(+id);
  }

  @Get('/find/by')
  @ApiOperation({ summary: "Find result by field and value" })
  @ApiResponse({ status: 200, description: 'Return result by search field and value' })
  @ApiQuery({ name: 'searchValue', required: true, example: 100 })
  @ApiQuery({ name: 'searchField', required: false, example: 'result'})
  async findOneBy(
    @Query('searchValue') searchValue: number,
    @Query('searchField') searchField: string = 'result'
  ) {
    const search = { searchField, searchValue };
    return await this.resultsService.findBy(search);
  }
  
  @Patch('/update/id/:id')
  @ApiOperation({ summary: "Update result by ID" })
  @ApiResponse({ status: 200, description: 'Result updated successfully' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the result' })
  async update(
    @Param('id') id: number,
    @Body() updateResultDto: UpdateResultDto
  ) {
    return await this.resultsService.updateBy(id, updateResultDto);
  }

  @Delete('/remove/:id')
  @ApiOperation({ summary: "Delete result by ID" })
  @ApiResponse({ status: 200, description: 'Result deleted successfully' })
  @ApiParam({ name: 'id', required: true, description: 'ID of the result' })
  async remove(@Param('id') id: string) {
    return await this.resultsService.removeById(+id);
  }
}
