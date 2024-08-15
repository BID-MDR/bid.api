import { Body, Controller, HttpCode, HttpException, HttpStatus, Logger, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ResponseDto } from "src/core/dtos/response.dto";
import { AuthenticateRequestDto } from "./dto/authenticate-request.dto";
import { AuthenticateService } from "./authenticate.service";


@ApiTags('Authenticate Backoffice')
@Controller('authenticate-backoffice')
export class AuthenticateController {

  private readonly _logger = new Logger(AuthenticateController.name);

  constructor(
    private readonly _authenticateService: AuthenticateService,
  ) { }

  @Post('/authenticate')
  @HttpCode(200)
  async authenticate(
    @Body() dto: AuthenticateRequestDto,
  ) {

    try {

      const response = await this._authenticateService.authenticate(dto);

      return new ResponseDto(
        true,
        response,
        null,
      );

    } catch (error) {

      this._logger.error(error.message);

      throw new HttpException(
        new ResponseDto(
          false,
          null,
          [error.message]), HttpStatus.BAD_REQUEST);
    }
  }

}