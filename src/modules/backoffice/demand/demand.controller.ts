import { Controller, Logger, Get, UseGuards, SerializeOptions, Req, Param, Put, Body, Post, Delete } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { ApiOkResponseDtoData } from "src/core/decorators/swagger/api-ok-response-dto.decorator";
import { JwtAccessTokenGuard } from "src/core/guards/jwt-access-token.guard";
import { JwtPayloadInterface } from "src/core/interfaces/jwt-payload.interface";
import { DemandRegisterRequestDto } from "src/modules/data-interaction/database/dtos/demand/register-demand.dto";
import { ResponseDemandDto } from "src/modules/data-interaction/database/dtos/demand/response-demand.dto";
import { StatusDemandDto } from "src/modules/data-interaction/database/dtos/demand/update-status-demand.dto";
import { DemandStatusEnum } from "src/modules/data-interaction/database/enums/demand-status.enum";
import { DemandBackofficeService } from "./demand.service";
import { RolesBackofficeGuard } from "src/core/guards/roles-backoffice.guard";
import { FunctionTypeEnum } from "../user/dto/functionTypeEnum";
import { Roles } from "src/core/decorators/roles-backoffice.decorator";
import { Request } from "express";


@Controller("demand-backoffice")
@ApiTags("Demand Backoffice")
export class DemandBackofficeController {
    private readonly _logger = new Logger(DemandBackofficeController.name);

    constructor(private demandService: DemandBackofficeService) {}

    @Get("")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard, RolesBackofficeGuard)
    @Roles([FunctionTypeEnum.CONTROLE_DEMANDA])
    async getLogged() {
        return await this.demandService.list();
    }

    @Get("get-month/:month")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    async getByMonth(@Param('month') month) {
        return await this.demandService.getByMonth(month);
    }

    @Get("id/:id")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard, RolesBackofficeGuard)
    @Roles([FunctionTypeEnum.CONTROLE_DEMANDA])
    async getById(@Param("id") id: string) {
        return await this.demandService.findById(id);
    }

    @Get("get-by-workRequestId/:id")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard, RolesBackofficeGuard)
    @Roles([FunctionTypeEnum.CONTROLE_DEMANDA])
    async getByWorkRequesId(@Param("id") id: string) {
        return await this.demandService.getByWorkRequestId(id);
    }

    @Get("get-by-professionalId/:id")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard, RolesBackofficeGuard)
    @Roles([FunctionTypeEnum.CONTROLE_DEMANDA])
    async getByProfessionalId(@Param("id") id: string) {
        return await this.demandService.listByUser(id);
    }

    @Get("get-by-professionalId/improvement/:id")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard, RolesBackofficeGuard)
    @Roles([FunctionTypeEnum.CONTROLE_DEMANDA])
    async getByProfessionalIdImprovement(@Param("id") id: string) {
        return await this.demandService.listByUserImprovement(id);
    }

    @Put("changeStatus/:id")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard, RolesBackofficeGuard)
    @Roles([FunctionTypeEnum.CONTROLE_DEMANDA])
    async changeStatus(@Param("id") id: string, @Body() status: StatusDemandDto) {
        return await this.demandService.updateStatus(id, status);
    }

    @Get("visit")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard, RolesBackofficeGuard)
    @Roles([FunctionTypeEnum.CONTROLE_DEMANDA])
    @ApiOkResponseDtoData({
        type: ResponseDemandDto,
        isArray: true,
        description: "Pedido de demanda.",
    })
    async listVisit(@Req() req: Request) {
        const userId = (req.user as JwtPayloadInterface).userId;
        return await this.demandService.listForVisit(userId);
    }

    @Get('constructions')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard, RolesBackofficeGuard)
    @Roles([FunctionTypeEnum.CONTROLE_DEMANDA])
    @ApiOkResponseDtoData({
        type: ResponseDemandDto,
        isArray: true,
        description: "Pedido de demanda.",
    })
    @SerializeOptions({
        type: ResponseDemandDto,
    })
    async listForConstructions(@Req() req: Request) {
        const userId = (req.user as JwtPayloadInterface).userId;
        return await this.demandService.listForConstructions(userId);
    }

    @Post("")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard, RolesBackofficeGuard)
    @Roles([FunctionTypeEnum.CONTROLE_DEMANDA])
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
    @UseGuards(JwtAccessTokenGuard, RolesBackofficeGuard)
    @Roles([FunctionTypeEnum.CONTROLE_DEMANDA])
    async delete(@Param("id") id: string) {
        return await this.demandService.delete(id);
    }

    @Get('status/:status')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard, RolesBackofficeGuard)
    @Roles([FunctionTypeEnum.CONTROLE_DEMANDA])
    @ApiOkResponseDtoData({
        type: ResponseDemandDto,
        isArray: true,
        description: "Pedido de demanda.",
    })
    @SerializeOptions({
        type: ResponseDemandDto,
    })
    async listByStatus(@Param('status') status: DemandStatusEnum) {
        return await this.demandService.listByStatus(status);
    }

    @Put('confirm-conclusion/:id')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard, RolesBackofficeGuard)
    @Roles([FunctionTypeEnum.CONTROLE_DEMANDA])
    @ApiOkResponseDtoData({
        type: ResponseDemandDto,
        isArray: true,
        description: "Pedido de demanda.",
    })
    @SerializeOptions({
        type: ResponseDemandDto,
    })
    async confirmConclusion(@Param('id') id: string, @Req() req: Request) {
        const userId = (req.user as JwtPayloadInterface).userId;
        return await this.demandService.confirmConclusion(id, userId);
    }
}
