import { Event } from '../../models/event.model';

export interface EventInterface {
    name: string;
    location: string;
    startDate: Date;
    endDate: Date;
}

export type CreateEventResponse = {
    isSuccess: boolean;
    message: string;
}

export type GetOneEventResponse = {
    isSuccess: true,
    event: Event,
} | {
    isSuccess: false,
    message: string,
}

export type RemoveEventResponse = CreateEventResponse;

export type EditEventResponse = CreateEventResponse;