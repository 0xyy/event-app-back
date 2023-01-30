import {Controller, Get} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";
import {TestService} from "../services/test.service";

@ApiTags('Test')
@Controller('test')
export class TestController {
    constructor(private testService: TestService) {}

    @Get('/')
    test(){
        return this.testService.test()
    }
}