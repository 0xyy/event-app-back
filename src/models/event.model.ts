import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { EventInterface } from '../types';

@Table({ tableName: 'events'})
export class Event extends Model<Event> implements EventInterface {
    @Column({
        type: DataType.UUID,
        unique: true,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataType.UUIDV4,
    })
    id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    location: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    startDate: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    endDate: Date;
}