import { Module } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { Result } from './entities/result.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayersModule } from '../players/players.module';
import { forwardRef } from '@nestjs/common';
import { TournamentModule } from '../tournament/tournament.module';

@Module({
  imports: 
  [TypeOrmModule.forFeature([Result]), 
  forwardRef(() => PlayersModule),
  forwardRef(() => TournamentModule)
],
  controllers: [ResultsController],
  providers: [ResultsService],
})
export class ResultsModule {}
