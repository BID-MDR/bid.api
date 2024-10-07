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
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { JwtAccessTokenGuard } from "../../../core/guards/jwt-access-token.guard";
import { CreateConstructionsDto } from "../../data-interaction/database/dtos/constructions/create-constructions.dto";
import { ConstructionsService } from "./constructions.service";
import { Roles } from "../../../core/decorators/roles.decorator";
import { RolesGuard } from "../../../core/guards/roles.guard";
import { EmployeeRoleEnum } from "../../data-interaction/database/enums/employee-role.enum";
import { Request } from "express";
import { JwtPayloadInterface } from "src/core/interfaces/jwt-payload.interface";

@Controller("construction")
@ApiTags("Constructions/obra")
export class ConstructionsController {
  private readonly _logger = new Logger(ConstructionsController.name);

  constructor(private constructionsService: ConstructionsService) {}

  @Get("")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  async get() {
    return await this.constructionsService.list();
  }

  @Get("get-month/:month")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  async getMonth(@Param('month') month: number) {
    return await this.constructionsService.listByMonth(month);
  }

  @Post("first-step-photos/:demandId")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard, RolesGuard)
  @Roles([EmployeeRoleEnum.manager_admin, EmployeeRoleEnum.manager_construction, EmployeeRoleEnum.manager_demand])
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
        roomSolutionId: { type: "string" },
      },
    },
  })
  async firstStepPhotos(
    @Param("demandId") demandId: string,
    @Body() dto: { roomSolutionId: string },
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Req() req: Request
  ) {
    const user = req.user as JwtPayloadInterface;
    return await this.constructionsService.firstStepPhotos(dto.roomSolutionId, files, demandId, user.companyId);
  }

  @Post("second-step-constructions/:demandId")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard, RolesGuard)
  @Roles([EmployeeRoleEnum.manager_admin, EmployeeRoleEnum.manager_construction, EmployeeRoleEnum.manager_demand])
  async secondStepConstructions(
    @Param("demandId") demandId: string,
    @Body() dto: CreateConstructionsDto,
    @Req() req: Request
  ) {
    const user = req.user as JwtPayloadInterface;
    return await this.constructionsService.secondStepConstructions(dto, demandId, user.companyId);
  }

  @Put("update-constructions/:demandId")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard, RolesGuard)
  @Roles([EmployeeRoleEnum.manager_admin, EmployeeRoleEnum.manager_construction])
  async update(@Param("demandId") demandId: string, @Body() dto: CreateConstructionsDto, @Req() req: Request) {
    const user = req.user as JwtPayloadInterface;
    return await this.constructionsService.update(dto, demandId, user.companyId);
  }

  @Delete("photo/:demandId/:photoId")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard, RolesGuard)
  @Roles([EmployeeRoleEnum.manager_admin, EmployeeRoleEnum.manager_construction])
  async deletePhoto(@Param("demandId") demandId: string, @Param("photoId") photoId: string) {
    return await this.constructionsService.deletePhoto(demandId, photoId);
  }

  @Put("finish-constructions/:demandId")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard, RolesGuard)
  @Roles([EmployeeRoleEnum.manager_admin, EmployeeRoleEnum.manager_construction])
  async finishConstructions(@Param("demandId") demandId: string, @Req() req: Request) {
    const user = req.user as JwtPayloadInterface;
    return await this.constructionsService.conclude(demandId, user.companyId);
  }
}
