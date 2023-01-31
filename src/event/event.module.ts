import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Event } from '../models/event.model';

@Module({
    controllers: [EventController],
    providers: [EventService],
    imports: [
        SequelizeModule.forFeature([Event])
    ],
})
export class EventModule {}
