import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Post,
    Put,
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
import { DemandStatusEnum } from "src/modules/data-interaction/database/enums/demand-status.enum";
import { StatusDemandDto } from "src/modules/data-interaction/database/dtos/demand/update-status-demand.dto";
import { Roles } from "../../../core/decorators/roles.decorator";
import { RolesGuard } from "../../../core/guards/roles.guard";
import { EmployeeRoleEnum } from "../../data-interaction/database/enums/employee-role.enum";

@Controller("demand")
@ApiTags("Demand/Pedido de demanda")
export class DemandController {
    private readonly _logger = new Logger(DemandController.name);

    constructor(private demandService: DemandService) { }

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
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOkResponseDtoData({
        type: DemandRegisterRequestDto,
        description: "Pedido de demanda.",
    })
    @SerializeOptions({
        type: ResponseDemandDto,
    })
    async getById(@Param("id") id: string) {
        return await this.demandService.getById(id);
    }

    @Get("get-by-workRequestId/:id")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    async getByWorkRequesId(@Param("id") id: string) {
        return await this.demandService.getByWorkRequestId(id);
    }

    @Get("get-by-professionalId/:id")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    async getByProfessionalId(@Param("id") id: string) {
        return await this.demandService.listByUser(id);
    }

    @Get("get-by-beneficiaryId/:id")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    async getByBeneficiaryId(@Param("id") id: string) {
        return await this.demandService.listByBeneficiary(id);
    }

    @Get("get-by-professionalId/improvement/:id")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    async getByProfessionalIdImprovement(@Param("id") id: string) {
        return await this.demandService.listByUserImprovement(id);
    }

    @Put("changeStatus/:id")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    async changeStatus(@Param("id") id: string, @Body() status: StatusDemandDto) {
        return await this.demandService.updateStatus(id, status);
    }

    @Get("visit")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
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
    @UseGuards(JwtAccessTokenGuard)
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
    @UseGuards(
        JwtAccessTokenGuard,
        // RolesGuard
    )
    // @Roles([EmployeeRoleEnum.manager_admin, EmployeeRoleEnum.manager_demand])
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

    @Post("register-single-demand")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard, RolesGuard)
    @Roles([EmployeeRoleEnum.manager_admin, EmployeeRoleEnum.manager_demand])
    @ApiOkResponseDtoData({
        type: ResponseDemandDto,
        description: "Pedido de demanda.",
    })
    @SerializeOptions({
        type: ResponseDemandDto,
    })
    async registerSingleDemand(@Req() req: Request, @Body() dto: DemandRegisterRequestDto) {
      
        const userId = (req.user as JwtPayloadInterface).userId;
       
        return await this.demandService.registerSingleDemand(userId, dto);
    }

    @Delete("delete-by-id/:id")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard, RolesGuard)
    @Roles([EmployeeRoleEnum.manager_admin, EmployeeRoleEnum.manager_demand])
    async delete(@Param("id") id: string) {
        return await this.demandService.delete(id);
    }

    @Get('status/:status')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
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

    @Get('sustainability/:document')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    async countSustainability(@Param('document') document: string) {
        return await this.demandService.countSustainability(document);
    }

    @Put('confirm-conclusion/:id')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
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
