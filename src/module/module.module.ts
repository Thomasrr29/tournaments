import { Module } from '@nestjs/common';
import { TournamentModule } from './tournament/tournament.module';
import { PlayersModule } from './players/players.module';
import { ResultsModule } from './results/results.module';
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [forwardRef(() => PlayersModule),
            forwardRef(() => ResultsModule),
            forwardRef(() => TournamentModule)]})
export class ModuleModule {}
