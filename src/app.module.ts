import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import {ScheduleModule} from "@nestjs/schedule";
import {SequelizeModule} from "@nestjs/sequelize";
import {TestModule} from "./modules/test.module";
import {Test} from "./models/test.model";

@Module({
    imports: [
        ScheduleModule.forRoot(),
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [Test],
            autoLoadModels: true
        }),
        TestModule
    ],
})
export class AppModule {}
