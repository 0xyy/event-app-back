import {Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";

@Table({tableName: 'test'})
export class Test extends Model<Test>{
    @ApiProperty({example: '0e631cae-9a35-4f86-b198-c0dbb762d808', description: 'Unique Id'})
    @Column({type: DataType.UUID, unique: true, primaryKey: true, defaultValue: DataType.UUIDV4})
    id: string;
}