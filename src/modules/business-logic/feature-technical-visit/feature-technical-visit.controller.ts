import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Logger,
    Param,
    Post,
    Put,
    Req,
    SerializeOptions,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import {
    ApiBearerAuth,
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiTags,
} from "@nestjs/swagger";
import { Request } from "express";
import { ApiOkResponseDtoData } from "src/core/decorators/swagger/api-ok-response-dto.decorator";
import { JwtAccessTokenGuard } from "src/core/guards/jwt-access-token.guard";
import { EncryptInterceptor } from "src/core/interceptors/encrypt.interceptor";
import { JwtPayloadInterface } from "src/core/interfaces/jwt-payload.interface";
import { CreateTechnicalVisitDto } from "src/modules/data-interaction/database/dtos/technical-visit/create-technical-visit.dto";
import { TechnicalVisitResponseDto } from "src/modules/data-interaction/database/dtos/technical-visit/reponse-technical-visit.dto";
import { UpdateTechnicalVisitDto } from "src/modules/data-interaction/database/dtos/technical-visit/update-technical-visit.dto";
import { FeatureTechnicalVisitService } from "./feature-technical-visit.service";
import { ResponseDto } from "src/core/dtos/response.dto";

@Controller("technical-visit")
@ApiTags("Technical Visit/Visita Técnica")
export class FeatureTechnicalVisitController {
    private readonly _logger = new Logger(FeatureTechnicalVisitController.name);

    constructor(
        private featureTechnicalVisitService: FeatureTechnicalVisitService,
    ) {}

    @Get("")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOperation({
        description:
            "Lista as visitas técnicas do usuário logado que iniciou a requisição através do JWT no header.",
        summary:
            "Lista as visitas técnicas do usuário logado que iniciou a requisição.",
    })
    @ApiOkResponseDtoData({
        type: TechnicalVisitResponseDto,
        description: "Pedido de obra.",
    })
    @SerializeOptions({
        type: TechnicalVisitResponseDto,
    })
    async listLogged(@Req() req: Request) {
        const userId = (req.user as JwtPayloadInterface).userId;
        const result =
            await this.featureTechnicalVisitService.getByProfessional(userId);
        return new ResponseDto(true, result, null);
    }

    @Get("id/:id")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOperation({
        description: "Retorna a visita técnica.",
        summary: "Retorna a visita técnica pelo ID.",
    })
    @ApiParam({
        name: "id",
        description: "ID da visita técnica.",
        required: true,
        allowEmptyValue: false,
    })
    @ApiOkResponseDtoData({
        type: TechnicalVisitResponseDto,
        description: "Visita técnica.",
    })
    @SerializeOptions({
        type: TechnicalVisitResponseDto,
    })
    async getById(@Param("id") id: string) {
        return await this.featureTechnicalVisitService.findById(id);
    }

    @Get("beneficiary")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOperation({
        description: "Retorna a visita técnica.",
        summary: "Retorna a visita técnica pelo ID do beneficiario.",
    })
    async getByBeneficiary(@Req() req: Request) {
        const userId = (req.user as JwtPayloadInterface).userId;
        return await this.featureTechnicalVisitService.findByBeneficiaryId(userId);
    }

    @Get("professional")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOperation({
        description: "Retorna a visita técnica.",
        summary: "Retorna a visita técnica pelo ID do profissional.",
    })
    async getByProfessional(@Req() req: Request) {
        const userId = (req.user as JwtPayloadInterface).userId;
        return await this.featureTechnicalVisitService.getByProfessional(userId);
    }

    @Post("")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOperation({
        description: "Cria uma visita técnica.",
        summary: "Cria uma visita técnica.",
    })
    @ApiBody({
        type: CreateTechnicalVisitDto,
        description: "Visita técnica a ser criada.",
    })
    async create(@Body() body: CreateTechnicalVisitDto) {
        const result = await this.featureTechnicalVisitService.schedule(body);
        return new ResponseDto(true, result, null);
    }

    @Post("register-work-technicalVisit")
    @UseInterceptors(new EncryptInterceptor())
    @ApiOperation({
        description: "Cria uma visita técnica.",
        summary: "Cria uma visita técnica.",
    })
    @ApiBody({
        type: CreateTechnicalVisitDto,
        required: true,
        description: "Visita técnica a ser criada.",
    })
    @ApiOkResponseDtoData({
        type: TechnicalVisitResponseDto,
        description: "Visita técnica criada.",
    })
    @SerializeOptions({
        type: TechnicalVisitResponseDto,
    })
    async scheduleRegistertWorkTechnicalVisit(@Body() body: CreateTechnicalVisitDto) {
        const result = await this.featureTechnicalVisitService.scheduleRegistertWorkTechnicalVisit(body);
        return new ResponseDto(true, result, null);
    }

    @Put("")
    @UseGuards(JwtAccessTokenGuard)
    @ApiBearerAuth()
    @ApiOperation({
        description: "Enpoint único para Atualizar uma visita técnica.",
        summary: "Atualiza uma visita técnica.",
    })
    @ApiBody({
        type: UpdateTechnicalVisitDto,
        required: true,
        description: "Visita técnica a ser atualizada.",
    })
    @ApiOkResponseDtoData({
        type: TechnicalVisitResponseDto,
        description: "Visita técnica atualizada.",
    })
    @SerializeOptions({
        type: TechnicalVisitResponseDto,
    })
    async update(@Req() req: Request, @Body() body: UpdateTechnicalVisitDto) {
        const userId = (req.user as JwtPayloadInterface).userId;

        return await this.featureTechnicalVisitService.update(userId, body);
    }

    @Put("update")
    @UseGuards(JwtAccessTokenGuard)
    @ApiBearerAuth()
    @ApiOperation({
        description: "Enpoint único para Atualizar uma visita técnica.",
        summary: "Atualiza uma visita técnica.",
    })
    @ApiBody({
        type: UpdateTechnicalVisitDto,
        required: true,
        description: "Visita técnica a ser atualizada.",
    })
    async updateById(@Body() body: UpdateTechnicalVisitDto) {
        console.log('teste',body);
        return await this.featureTechnicalVisitService.update(body.id, body);
    }
}
