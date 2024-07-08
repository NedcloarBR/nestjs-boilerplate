import { Controller, Get, HttpStatus } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller()
export class AppController {
  public constructor(private readonly appService: AppService) {}

  @Get()
  @ApiTags("Controllers")
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Should return "Hello World!"',
  })
  public getHello(): string {
    return this.appService.getHello();
  }
}
