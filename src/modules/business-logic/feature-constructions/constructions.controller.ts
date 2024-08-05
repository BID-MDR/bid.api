import {
  Body,
  Controller,
  Delete,
  Logger,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { JwtAccessTokenGuard } from "../../../core/guards/jwt-access-token.guard";
import { CreateConstructionsDto } from "../../data-interaction/database/dtos/constructions/create-constructions.dto";
import { ConstructionsService } from "./constructions.service";

@Controller("construction")
@ApiTags("Constructions/obra")
export class ConstructionsController {
  private readonly _logger = new Logger(ConstructionsController.name);

  constructor(private constructionsService: ConstructionsService) {}

  @Post("first-step-photos/:demandId")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
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
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    return await this.constructionsService.firstStepPhotos(dto.roomSolutionId, files, demandId);
  }

  @Post("second-step-constructions/:demandId")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  async secondStepConstructions(@Param("demandId") demandId: string, @Body() dto: CreateConstructionsDto) {
    return await this.constructionsService.secondStepConstructions(dto, demandId);
  }

  @Put("update-constructions/:demandId")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  async update(@Param("demandId") demandId: string, @Body() dto: CreateConstructionsDto) {
    return await this.constructionsService.update(dto, demandId);
  }


  @Delete("photo/:demandId/:photoId")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  async deletePhoto(@Param("demandId") demandId: string, @Param("photoId") photoId: string) {
    return await this.constructionsService.deletePhoto(demandId, photoId);
  }

}
