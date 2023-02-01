import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventResponse, EditEventResponse, GetOneEventResponse, RemoveEventResponse } from '../types';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('event')
export class EventController {
    constructor(
        private readonly eventService: EventService,
    ) {}

    @Get('/test')
    async getAll() {
        return 'test';
    }

    @Get('/:id')
    async getOneEvent(
        @Param('id') id: string,
    ): Promise<GetOneEventResponse> {
        return this.eventService.getOne(id);
    }

    @Post('/')
    async createEvent(
        @Body() createEventDto: CreateEventDto,
    ): Promise<CreateEventResponse> {
        return this.eventService.create(createEventDto);
    }

    @Put('/:id')
    async editEvent(
        @Param('id') id: string,
        @Body() updateEventDto: UpdateEventDto,
    ): Promise<EditEventResponse> {
        return this.eventService.edit(id, updateEventDto);
    }

    @Delete('/:id')
    async removeEvent(
        @Param('id') id: string
    ): Promise<RemoveEventResponse> {
        return this.eventService.remove(id);
    }
}
