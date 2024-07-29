import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Post,
    Req,
    SerializeOptions,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { plainToInstance } from "class-transformer";
import { Request } from "express";
import { ApiOkResponseDtoData } from "src/core/decorators/swagger/api-ok-response-dto.decorator";
import { JwtAccessTokenGuard } from "src/core/guards/jwt-access-token.guard";
import { JwtPayloadInterface } from "src/core/interfaces/jwt-payload.interface";
import { DemandRegisterRequestDto } from "src/modules/data-interaction/database/dtos/demand/register-demand.dto";
import { ResponseDemandDto } from "../../data-interaction/database/dtos/demand/response-demand.dto";
import { DemandService } from "./demand.service";

@Controller("demand")
@ApiTags("Demand/Pedido de demanda")
export class DemandController {
    private readonly _logger = new Logger(DemandController.name);

    constructor(private demandService: DemandService) {}

    @Get("")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOkResponseDtoData({
        type: ResponseDemandDto,
        description: "Pedido de obra.",
    })
    @SerializeOptions({
        type: ResponseDemandDto,
    })
    async getLogged(@Req() req: Request) {
        const userId = (req.user as JwtPayloadInterface).userId;
        return await this.demandService.listByUser(userId);
        // return plainToInstance(ResponseDemandDto, result);
    }

    @Get("id/:id")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOkResponseDtoData({
        type: DemandRegisterRequestDto,
        description: "Pedido de demanda.",
    })
    async getById(@Param("id") id: string) {
        return await this.demandService.findById(id);
    }

    @Post("")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOkResponseDtoData({
        type: ResponseDemandDto,
        description: "Pedido de demanda.",
    })
    async register(@Req() req: Request, @Body() dto: DemandRegisterRequestDto) {
        const userId = (req.user as JwtPayloadInterface).userId;
        return await this.demandService.register(userId, dto);
    }

    @Delete("delete-by-id/:id")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    async delete(@Param("id") id: string) {
        return await this.demandService.delete(id);
    }
}
