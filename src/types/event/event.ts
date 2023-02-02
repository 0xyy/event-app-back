import { CreateEventDto } from '../../event/dto/create-event.dto';
import { UpdateEventDto } from '../../event/dto/update-event.dto';

interface SimpleEventInterface {
    id: string;
    name: string;
    location: string;
}

export interface EventInterface extends SimpleEventInterface {
    startDate: string;
    endDate: string;
}

export interface EventModelInterface extends SimpleEventInterface {
    startDate: Date;
    endDate: Date;
}

export type CreateEventRequest = CreateEventDto;

export type EditEventRequest = UpdateEventDto;

export type GetAllEventsResponse = {
    events: EventInterface[] | EventModelInterface[];
    totalEvents: number;
}

export type CreateEventResponse = {
    isSuccess: boolean;
    message: string;
}

export type GetOneEventResponse = {
    isSuccess: true,
    event: EventInterface | EventModelInterface,
} | {
    isSuccess: false,
    message: string,
}

export type RemoveEventResponse = CreateEventResponse;

export type EditEventResponse = CreateEventResponse;