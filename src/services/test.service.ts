import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Test} from "../models/test.model";

@Injectable()
export class TestService {
    constructor(@InjectModel(Test) private testRepository: typeof Test) {}

    async test(){
        return await this.testRepository.findOne()
    }
}