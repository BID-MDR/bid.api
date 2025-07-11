import { Controller, Logger, Get, UseGuards, SerializeOptions, Req, Param, Put, Body, Post, Delete } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { JwtAccessTokenGuard } from "src/core/guards/jwt-access-token.guard";
import { ContractService } from "./contract.service";


@Controller("contract-backoffice")
@ApiTags("Contract Backoffice")
export class ContractdBackofficeController {
    private readonly _logger = new Logger(ContractdBackofficeController.name);

    constructor(private service: ContractService) {}

    @Get("")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    // @Roles([FunctionTypeEnum.CONTROLE_DEMANDA])
    async getLogged() {
        return await this.service.list();
    }

    @Get("id/:id")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    // @Roles([FunctionTypeEnum.CONTROLE_DEMANDA])
    async getById(@Param("id") id: string) {
        return await this.service.findById(id);
    }

}
