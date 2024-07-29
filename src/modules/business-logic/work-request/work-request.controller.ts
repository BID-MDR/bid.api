import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Logger,
    Param,
    Post,
    Put,
    SerializeOptions,
    UseInterceptors,
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { WorkRequestService } from "./work-request.service";
import { ApiOkResponseDtoData } from "../../../core/decorators/swagger/api-ok-response-dto.decorator";
import { ResponseWorkRequestDto } from "../../data-interaction/database/dtos/work-request/response-work-request.dto";
import { CreateWorkRequestDto } from "../../data-interaction/database/dtos/work-request/create-work-request.dto";
import { UpdateWorkRequestDto } from "../../data-interaction/database/dtos/work-request/update-work-request.dto";

@Controller("work-request")
@ApiTags("Work Request/Vistoria")
export class WorkRequestController {
    private readonly _logger = new Logger(WorkRequestController.name);
    constructor(private service: WorkRequestService) {}

    @Get("")
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
        ignoreDecorators: true,
    })
    async list() {
        return await this.service.list();
    }

    @Get("id/:id")
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
