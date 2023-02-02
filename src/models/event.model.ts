import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { EventModelInterface } from '../types';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'events'})
export class Event extends Model<Event> implements EventModelInterface {
    @ApiProperty({
        type: 'string',
        description: 'Unique event uuid',
        example: '9c3df80a-30b6-48db-bab1-5b1fcfa0039c',
    })
    @Column({
        type: DataType.UUID,
        unique: true,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataType.UUIDV4,
    })
    id: string;

    @ApiProperty({
        type: 'string',
        description: 'Event name',
        example: 'NestJS Conference',
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @ApiProperty({
        type: 'string',
        description: 'Event location',
        example: 'San Francisco, CA',
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    location: string;

    @ApiProperty({
        type: 'string',
        format: 'date',
        description: 'Event start date',
        example: '2023-03-03',
    })
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    startDate: Date;

    @ApiProperty({
        type: 'string',
        format: 'date',
        description: 'Event end date',
        example: '2023-03-05',
    })
    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    endDate: Date;
}