import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Post,
    Req,
    SerializeOptions,
    UseGuards
} from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
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
        isArray: true,
        description: "Pedido de obra.",
    })
    @SerializeOptions({
        type: ResponseDemandDto,
    })
    async getLogged(@Req() req: Request) {
        const userId = (req.user as JwtPayloadInterface).userId;
        return await this.demandService.listByUser(userId);
    }

    @Get("id/:id")
    // @ApiBearerAuth()
    // @UseGuards(JwtAccessTokenGuard)
    @ApiOkResponseDtoData({
        type: DemandRegisterRequestDto,
        description: "Pedido de demanda.",
    })
    @SerializeOptions({
        type: ResponseDemandDto,
    })
    async getById(@Param("id") id: string) {
        return await this.demandService.findById(id);
    }

    @Get("get-by-workRequestId/:id")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @SerializeOptions({
        type: ResponseDemandDto,
    })
    async getByWorkRequesId(@Param("id") id: string) {
        return await this.demandService.getByWorkRequestId(id);
    }

    @Post("")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOkResponseDtoData({
        type: ResponseDemandDto,
        description: "Pedido de demanda.",
    })
    @SerializeOptions({
        type: ResponseDemandDto,
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
