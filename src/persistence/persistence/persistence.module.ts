import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [

        ConfigModule.forRoot({
            envFilePath:'.env',
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: +process.env.DB_PORT,
                username: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_NAME,
                autoLoadEntities: true,
                synchronize: true,
                "entities": ["dist/**/*.entity{.ts,.js}"],
                "ssl": {
                "rejectUnauthorized": false
                }
        })
    ]
})
export class PersistenceModule {}
