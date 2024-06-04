import { Module, forwardRef } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { TournamentController } from './tournament.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { PlayersModule } from '../players/players.module';


@Module({
  imports: [TypeOrmModule.forFeature([Tournament]), forwardRef(() => PlayersModule)],
  controllers: [TournamentController],
  providers: [TournamentService],
  exports: [TypeOrmModule]
})
export class TournamentModule {}
