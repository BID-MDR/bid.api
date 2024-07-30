import {
    Body,
    Controller,
    Get,
    Logger,
    Param,
    Post,
    Put,
    SerializeOptions,
    UseGuards
} from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ApiOkResponseDtoData } from "../../../core/decorators/swagger/api-ok-response-dto.decorator";
import { CreateWorkRequestDto } from "../../data-interaction/database/dtos/work-request/create-work-request.dto";
import { ResponseWorkRequestDto } from "../../data-interaction/database/dtos/work-request/response-work-request.dto";
import { UpdateWorkRequestDto } from "../../data-interaction/database/dtos/work-request/update-work-request.dto";
import { WorkRequestService } from "./work-request.service";
import { JwtAccessTokenGuard } from "../../../core/guards/jwt-access-token.guard";

@Controller("work-request")
@ApiTags("Work Request/Vistoria")
export class WorkRequestController {
    private readonly _logger = new Logger(WorkRequestController.name);
    constructor(private service: WorkRequestService) {}

    @Get("")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOperation({
        description: "Lista de vistorias.",
        summary: "Listar vistorias.",
    })
    @ApiOkResponseDtoData({
        type: ResponseWorkRequestDto,
        description: "Lista de vistorias.",
    })
    @SerializeOptions({
        type: ResponseWorkRequestDto,
    })
    async list() {
        return await this.service.list();
    }

    @Get("id/:id")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOperation({
        description: "Vistoria por ID.",
        summary: "Vistoria por ID.",
    })
    @ApiOkResponseDtoData({
        type: ResponseWorkRequestDto,
        description: "Vistoria por ID.",
    })
    @SerializeOptions({
        type: ResponseWorkRequestDto,
    })
    async getById(@Param('id') id: string) {
        return await this.service.findById(id);
    }

    @Post("")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOperation({
        description: "Registrar vistoria.",
        summary: "Registrar vistoria.",
    })
    @ApiOkResponseDtoData({
        type: ResponseWorkRequestDto,
        description: "Vistoria registrada.",
    })
    @ApiBody({
        type: CreateWorkRequestDto,
        required: true,
        description: "Construção a ser criado.",
    })
    async create(@Body() dto: CreateWorkRequestDto) {
        return await this.service.register(dto);
    }

    @Put("id/:id")
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOperation({
        description: "Atualizar vistoria.",
        summary: "Atualizar vistoria.",
    })
    @ApiOkResponseDtoData({
        type: ResponseWorkRequestDto,
        description: "Vistoria atualizada.",
    })
    @ApiBody({
        type: UpdateWorkRequestDto,
        required: true,
        description: "Construção a ser atualizado.",
    })
    @SerializeOptions({
        type: ResponseWorkRequestDto,
    })
    async update(@Param('id') id: string, @Body() dto: UpdateWorkRequestDto) {
        return await this.service.update(id, dto);
    }
}
