import {
    Body,
    Controller,
    Get,
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
import { ResponseDto } from "src/core/dtos/response.dto";
import { FeatureSurveyService } from "./feature-survey.service";
import { CreateProfessionalSurveyDto } from "src/modules/data-interaction/database/dtos/professional-survey/create-professional-survey.dto";
import { SurveyResponseDto } from "src/modules/data-interaction/database/dtos/professional-survey/reponse-survey.dto";

@Controller("survey")
@ApiTags("Survey/Vistoria")
export class FeatureSurveyController {
    private readonly _logger = new Logger(FeatureSurveyController.name);

    constructor(
        private featureSurveyService: FeatureSurveyService,
    ) {}

    @Get("")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOperation({
        description:
            "Lista as vistorias do usuário logado que iniciou a requisição através do JWT no header.",
        summary:
            "Lista as vistorias do usuário logado que iniciou a requisição.",
    })
    @ApiOkResponseDtoData({
        type: CreateProfessionalSurveyDto,
        description: "vistoria.",
    })
    @SerializeOptions({
        type: CreateProfessionalSurveyDto,
    })
    async listLogged(@Req() req: Request) {
        const userId = (req.user as JwtPayloadInterface).userId;
        const result =
            await this.featureSurveyService.getByProfessional(userId);
        return new ResponseDto(true, result, null);
    }

    @Get("id/:id")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOperation({
        description: "Retorna a vistoria.",
        summary: "Retorna a vistoria pelo ID.",
    })
    @ApiParam({
        name: "id",
        description: "ID da vistoria.",
        required: true,
        allowEmptyValue: false,
    })
    @ApiOkResponseDtoData({
        type: SurveyResponseDto,
        description: "Vistoria.",
    })
    @SerializeOptions({
        type: SurveyResponseDto,
    })
    async getById(@Param("id") id: string) {
        return await this.featureSurveyService.findById(id);
    }

    @Post("")
    @UseInterceptors(new EncryptInterceptor())
    @ApiOperation({
        description: "Cria uma Vistoria.",
        summary: "Cria uma Vistoria.",
    })
    @ApiBody({
        type: CreateProfessionalSurveyDto,
        required: true,
        description: "Vistoria a ser criada.",
    })
    @ApiOkResponseDtoData({
        type: SurveyResponseDto,
        description: "Vistoria criada.",
    })
    @SerializeOptions({
        type: SurveyResponseDto,
    })
    async create(@Body() body: CreateProfessionalSurveyDto) {
        const result = await this.featureSurveyService.create(body);
        return new ResponseDto(true, result, null);
    }

    @Put("")
    @UseGuards(JwtAccessTokenGuard)
    @ApiBearerAuth()
    @ApiOperation({
        description: "Enpoint único para Atualizar uma Vistoria.",
        summary: "Atualiza uma Vistoria.",
    })
    @ApiBody({
        type: CreateProfessionalSurveyDto,
        required: true,
        description: "Vistoria a ser atualizada.",
    })
    @ApiOkResponseDtoData({
        type: SurveyResponseDto,
        description: "Vistoria atualizada.",
    })
    @SerializeOptions({
        type: SurveyResponseDto,
    })
    async update(@Req() req: Request, @Body() body: CreateProfessionalSurveyDto) {
        const userId = (req.user as JwtPayloadInterface).userId;

        return await this.featureSurveyService.update(userId, body);
    }
}
