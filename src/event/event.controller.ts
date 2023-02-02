import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { EventService } from './event.service';
import {
    CreateEventResponse,
    EditEventResponse,
    GetAllEventsResponse,
    GetOneEventResponse,
    RemoveEventResponse
} from '../types';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Event')
@Controller('event')
export class EventController {
    constructor(
        private readonly eventService: EventService,
    ) {}

    @Get('/')
    @ApiOperation({ summary: 'Get all events with pagination' })
    @ApiResponse({
        status: 200,
        description: 'List of all events on given page and total pages',
    })
    async getAllEvents(
        @Query('page') page: number,
        @Query('limit') limit: number,
    ): Promise<GetAllEventsResponse> {
        return this.eventService.getAll(page, limit);
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Get a single event by id' })
    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'unique uuid',
        required: true,
    })
    @ApiResponse({
        status: 200,
        description: 'Details of a single event',
    })
    async getOneEvent(
        @Param('id') id: string,
    ): Promise<GetOneEventResponse> {
        return this.eventService.getOne(id);
    }

    @Post('/')
    @ApiOperation({ summary: 'Create a new event' })
    @ApiResponse({
        status: 201,
        description: 'Message with the newly created event',
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    example: 'Concert',
                    description: 'Event name',
                },
                location: {
                    type: 'string',
                    example: 'Warsaw',
                    description: 'Event location',
                },
                startDate: {
                    type: 'string',
                    format: 'date',
                    example: '2023-03-03',
                    description: 'Event start date',
                },
                endDate: {
                    type: 'string',
                    format: 'date',
                    example: '2023-03-05',
                    description: 'Event end date',
                }
            }
        }
    })
    async createEvent(
        @Body() createEventDto: CreateEventDto,
    ): Promise<CreateEventResponse> {
        return this.eventService.create(createEventDto);
    }

    @Put('/:id')
    @ApiOperation({ summary: 'Update an existing event' })
    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'unique uuid',
        required: true,
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                name: {
                    type: 'string',
                    example: 'Concert',
                    description: 'Event name',
                },
                location: {
                    type: 'string',
                    example: 'Warsaw',
                    description: 'Event location',
                },
                startDate: {
                    type: 'string',
                    format: 'date',
                    example: '2023-03-03',
                    description: 'Event start date',
                },
                endDate: {
                    type: 'string',
                    format: 'date',
                    example: '2023-03-05',
                    description: 'Event end date',
                }
            }
        }
    })
    @ApiResponse({
        status: 200,
        description: 'Message with the updated event',
    })
    async editEvent(
        @Param('id') id: string,
        @Body() updateEventDto: UpdateEventDto,
    ): Promise<EditEventResponse> {
        return this.eventService.edit(id, updateEventDto);
    }

    @Delete('/:id')
    @ApiOperation({ summary: 'Delete an existing event' })
    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'unique uuid',
        required: true,
    })
    @ApiResponse({
        status: 200,
        description: 'message with the deleted event',
    })
    async removeEvent(
        @Param('id') id: string
    ): Promise<RemoveEventResponse> {
        return this.eventService.remove(id);
    }
}
