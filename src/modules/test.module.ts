import {Module} from "@nestjs/common";
import {TestService} from "../services/test.service";
import {TestController} from "../cotrollers/test.controller";
import {SequelizeModule} from "@nestjs/sequelize";
import {Test} from "../models/test.model";

@Module({
    providers: [TestService],
    controllers: [TestController],
    imports: [
        SequelizeModule.forFeature([Test])
    ]
})
export class TestModule {}