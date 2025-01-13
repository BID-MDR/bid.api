import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    SerializeOptions,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiOkResponseDtoData } from 'src/core/decorators/swagger/api-ok-response-dto.decorator';
import { JwtAccessTokenGuard } from 'src/core/guards/jwt-access-token.guard';
import { EncryptInterceptor } from 'src/core/interceptors/encrypt.interceptor';
import { CreateRoomDto } from 'src/modules/data-interaction/database/dtos/room/create-room.dto';
import { RoomResponseDto } from 'src/modules/data-interaction/database/dtos/room/reponse-room.dto';
import { FeatureRoomService } from './feature-room.service';
import { CreateRoomSolutionDto } from 'src/modules/data-interaction/database/dtos/room-solution/create-room-solution.dto';
import { RequestRoomSolutionDto } from 'src/modules/data-interaction/database/dtos/room-solution/request.dto';
import { Roles } from '../../../core/decorators/roles.decorator';
import { RolesGuard } from '../../../core/guards/roles.guard';
import { EmployeeRoleEnum } from '../../data-interaction/database/enums/employee-role.enum';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('room')
@ApiTags('Quarto')
export class FeatureRoomController {
    constructor(
        private featureRoomService: FeatureRoomService
    ) {}
    @Put("add-start-photo/:roomId")
     @UseInterceptors(FilesInterceptor("files"))
     @ApiConsumes("multipart/form-data")
     @ApiBody({
       schema: {
         type: "object",
         properties: {
           files: {
             type: "array",
             items: {
               type: "string",
               format: "binary",
             },
           },
         },
       },
     })
     async addStartPhotos(
       @Param("roomId") roomId: string,
       @UploadedFiles() files: Array<Express.Multer.File>,
    
     ) {
       return await this.featureRoomService.addStartPhoto(roomId, files);
     }

     @Put("add-end-photo/:roomId")
     @UseInterceptors(FilesInterceptor("files"))
     @ApiConsumes("multipart/form-data")
     @ApiBody({
       schema: {
         type: "object",
         properties: {
           files: {
             type: "array",
             items: {
               type: "string",
               format: "binary",
             },
           },
         },
       },
     })
     async addEndPhotos(
       @Param("roomId") roomId: string,
       @UploadedFiles() files: Array<Express.Multer.File>,
    
     ) {
       return await this.featureRoomService.addEndPhoto(roomId, files);
     }

    @Get('')
    // @ApiBearerAuth()
    // @UseGuards(JwtAccessTokenGuard)
    async list() {
        return await this.featureRoomService.selectAll();
    }

    @Get(':id')
    // @ApiBearerAuth()
    // @UseGuards(JwtAccessTokenGuard)
    async listByWorkRequest(@Param('id') id: string) {
        return await this.featureRoomService.selectAllWithIntervention(id);
    }

    @Get('get-room-by/:id')
    // @ApiBearerAuth()
    // @UseGuards(JwtAccessTokenGuard)
    async getRoomById(@Param('id') id: string) {
        return await this.featureRoomService.getRoomById(id);
    }

    @Get('listbyworkrequest/:id')
    // @ApiBearerAuth()
    // @UseGuards(JwtAccessTokenGuard)
    async listByWorkRequestId(@Param('id') id: string) {
        return await this.featureRoomService.selectAllByWorkRequest(id);
    }


    @Get('id/:id')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOperation({
        description: 'Retorna o Quarto.',
        summary: 'Retorna o Quarto por ID.',
    })
    @ApiParam({
        name: 'id',
        description: 'ID do Quarto.',
        required: true,
        allowEmptyValue: false,
    })
    @ApiOkResponseDtoData({
        type: RoomResponseDto,
        description: 'Quarto.',
    })
    @SerializeOptions({
        type: RoomResponseDto,
    })
    async getById(@Param('id') id: string) {
        return await this.featureRoomService.findById(id);
    }

    @Get('get-room/:id')
    @ApiBearerAuth()
    @UseGuards(JwtAccessTokenGuard)
    @ApiOperation({
        description: 'Retorna o Quarto.',
        summary: 'Retorna o Quarto por ID.',
    })
    @ApiParam({
        name: 'id',
        description: 'ID do Quarto.',
        required: true,
        allowEmptyValue: false,
    })
    async getRoom(@Param('id') id: string) {
        return await this.featureRoomService.getRoomByRoomSolutionId(id);
    }

    @Post('')
    @UseInterceptors(new EncryptInterceptor())
    @UseGuards(JwtAccessTokenGuard, RolesGuard)
    @Roles([EmployeeRoleEnum.manager_admin, EmployeeRoleEnum.manager_quality, EmployeeRoleEnum.manager_inspection])
    @ApiOperation({
        description: 'Cria um Quarto.',
        summary: 'Cria um Quarto.',
    })
    @ApiBody({
        type: CreateRoomDto,
        required: true,
        description: 'Quarto a ser criado.',
    })
    @ApiOkResponseDtoData({
        type: RoomResponseDto,
        description: 'Quarto a ser criado.',
    })
    @SerializeOptions({
        type: RoomResponseDto,
    })
    async create(@Body() body: CreateRoomDto) {
        return await this.featureRoomService.create(body);
    }

    @Post('room-solution')
    @UseGuards(JwtAccessTokenGuard, RolesGuard)
    @Roles([EmployeeRoleEnum.manager_admin, EmployeeRoleEnum.manager_quality])
    @UseInterceptors(new EncryptInterceptor())
    @ApiOperation({
        description: 'Cria um Quarto.',
        summary: 'Cria um Quarto.',
    })
    @ApiBody({
        type: CreateRoomSolutionDto,
        required: true,
        description: 'Quarto a ser criado.',
    })
    @ApiOkResponseDtoData({
        type: RoomResponseDto,
        description: 'Quarto a ser criado.',
    })
    @SerializeOptions({
        type: RoomResponseDto,
    })
    async createRoomSolution(@Body() body: CreateRoomSolutionDto) {
        return await this.featureRoomService.createRoomSolution(body);
    }

    @Post('room-solution/wait-intervention')
    @UseGuards(JwtAccessTokenGuard, RolesGuard)
    @Roles([EmployeeRoleEnum.manager_admin, EmployeeRoleEnum.manager_quality])
    @UseInterceptors(new EncryptInterceptor())
    async waitIntervention(@Body() body: RequestRoomSolutionDto){

       return await this.featureRoomService.register(body)
    }


    @Get('room-solution/:id')
    @UseInterceptors(new EncryptInterceptor())
    async selectSolutions(@Param('id') id: string){

       return await this.featureRoomService.selectInterventions(id)
    }

}
