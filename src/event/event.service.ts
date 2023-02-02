import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Cron, CronExpression } from '@nestjs/schedule';
const { Op } = require('sequelize');
import { Event } from '../models/event.model';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import {
    CreateEventResponse,
    EditEventResponse,
    EventModelInterface, GetAllEventsResponse,
    GetOneEventResponse,
    RemoveEventResponse
} from '../types';
import { isBeforeToday } from '../utils/is-before-today';

@Injectable()
export class EventService {
    private readonly logger = new Logger(EventService.name);

    constructor(
        @InjectModel(Event) private readonly eventModel: typeof Event,
    ) {}

    private validateEvent(name, location, startDate, endDate) {
        if (!name || name.length < 2 || name.length > 24) {
            throw new Error('Nazwa wydarzenia jest nie poprawna!');
        }

        if (!location || location.length < 2 || location.length > 35) {
            throw new Error('Lokalizacja jest nie poprawna!');
        }

        if (isBeforeToday(new Date(startDate))) {
            throw new Error('Data początku nie może być wcześniejsze niż dzisiejsza data!');
        }

        if (new Date(endDate) < new Date(startDate)) {
            throw new Error('Data końca nie może być wcześniejsza niż data początku!');
        }
    }

    async getAll(page: number, limit: number): Promise<GetAllEventsResponse> {
        const offset = (page - 1) * limit;

        const events = await this.eventModel.findAll({
            limit,
            offset,
        });

        const totalEvents = (await this.eventModel.findAndCountAll()).count;

        return {
            events,
            totalEvents,
        };
    }


    async getOne(id: string): Promise<GetOneEventResponse> {
        try {
            const event: EventModelInterface = await this.eventModel.findByPk(id);

            if (!event) {
                throw new Error();
            }

            return {
                isSuccess: true,
                event,
            };
        } catch (err) {
            return {
                isSuccess: false,
                message: `Nie znaleziono wydarzenia o podanym id ${id}.`,
            };
        }
    }

    async create(createEventDto: CreateEventDto): Promise<CreateEventResponse> {
        try {
            const { name, location, startDate, endDate } = createEventDto;

            this.validateEvent(name, location, startDate, endDate);

            const event = new this.eventModel(createEventDto);

            await event.save();

            return {
                isSuccess: true,
                message: `Dodano poprawnie nowe wydarzenie o nazwie ${name}.`,
            };
        } catch (err) {
            return {
                isSuccess: false,
                message: err.message,
            };
        }
    }

    async edit(id: string, updateEventDto: UpdateEventDto): Promise<EditEventResponse> {
        try {
            const event = await this.eventModel.findByPk(id);

            if (!event) {
                throw new Error();
            }

            const { name, location, startDate, endDate } = updateEventDto;

            this.validateEvent(name, location, startDate, endDate);

            await event.update(updateEventDto);

            return {
                isSuccess: true,
                message: `Zedytowano pomyślnie wydarzenie o nazwie ${event.name}.`,
            };
        } catch (err) {
            return {
                isSuccess: false,
                message: err.message,
            };
        }
    }

    async remove(id: string): Promise<RemoveEventResponse> {
        try {
            const event = await this.eventModel.findByPk(id);

            if (!event) {
                throw new Error();
            }

            await event.destroy();

            return {
                isSuccess: true,
                message: `Usunięto pomyślnie wydarzenie o nazwie ${event.name}.`,
            };
        } catch (err) {
            return {
                isSuccess: false,
                message: `Nie znaleziono wydarzenia o podanym id ${id}.`,
            };
        }
    }

    @Cron(CronExpression.EVERY_WEEK)
    async removeOldEvents() {
        const currentDate = new Date();
        const oldEvents = await this.eventModel.findAll({
            where: {
                endDate: {
                    [Op.lt]: currentDate,
                },
            },
        });

        for (const event of oldEvents) {
            await event.destroy();
        }

        this.logger.debug(`Usunięto ${oldEvents.length} starych wydarzeń.`);
    }
}
