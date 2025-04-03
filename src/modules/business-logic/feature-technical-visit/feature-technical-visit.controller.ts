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
import { RescheduleTechnicalVisitDto } from "src/modules/data-interaction/database/dtos/technical-visit/reschedule-technical-visit.dto";
import { CreateTechnicalVisitUpdateImprovementProjectDto } from "src/modules/data-interaction/database/dtos/technical-visit/create-technical-visit-update-improvement-project.dto";

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
    async getById(@Param("id") id: string) {
        return await this.featureTechnicalVisitService.getById(id);
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

    @Get("professionalTechnicalVisit")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOperation({
        description: "Retorna a visita técnica.",
        summary: "Retorna a visita técnica pelo ID do profissional.",
    })
    async getByProfessionalVisitaTecnicaAgendada(@Req() req: Request) {
        const userId = (req.user as JwtPayloadInterface).userId;
        return await this.featureTechnicalVisitService.getByProfessionalVisitaTecnicaAgendada(userId);
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
    async create(@Req() req: Request, @Body() body: CreateTechnicalVisitDto) {
        const userId = (req.user as JwtPayloadInterface).userId;
        const result = await this.featureTechnicalVisitService.scheduleTechnicalVisit(userId, body);
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
    @Post("create-technicalvisit-update-improvement-project")
    @UseInterceptors(new EncryptInterceptor())
    async scheduleTechnicalVisitAndUpdateImprovementProject( @Body() body: CreateTechnicalVisitUpdateImprovementProjectDto) {
      
        const result = await this.featureTechnicalVisitService.scheduleTechnicalVisitAndUpdateImprovementProject(body);
        return new ResponseDto(true, result, null);
    }


    @Put(":id")
    @UseGuards(JwtAccessTokenGuard)
    @ApiBearerAuth()
    @ApiOperation({
        description: "Atualiza uma visita técnica pelo ID.",
        summary: "Atualiza uma visita técnica.",
    })
    @ApiBody({
        type: UpdateTechnicalVisitDto,
        required: true,
        description: "Dados da visita técnica a serem atualizados.",
    })
    async update(
        @Param("id") id: string,
        @Body() body: UpdateTechnicalVisitDto
    ) {
        return await this.featureTechnicalVisitService.update(id, body);
    }
    
    @Put("reschedule-technical-visit/:technicalVisitId")
    @UseGuards(JwtAccessTokenGuard)
    @ApiBearerAuth()
    async reSchedule(@Param('technicalVisitId') technicalVisitId: string   , @Body() body: RescheduleTechnicalVisitDto) {
        return await this.featureTechnicalVisitService.reScheduleVisit(technicalVisitId, body);
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
        return await this.featureTechnicalVisitService.update(body.id, body);
    }
}
