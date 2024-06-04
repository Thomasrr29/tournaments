import { Module } from '@nestjs/common';
import { ModuleModule } from './module/module.module';
import { PersistenceModule } from './persistence/persistence/persistence.module';

@Module({
  imports: [ModuleModule, PersistenceModule],
})
export class AppModule {}
