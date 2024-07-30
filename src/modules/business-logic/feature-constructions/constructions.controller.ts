import {
  BadRequestException,
  Body,
  Controller,
  Logger,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileFieldsInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { JwtAccessTokenGuard } from "../../../core/guards/jwt-access-token.guard";
import { CreateConstructionsDto } from "../../data-interaction/database/dtos/constructions/create-constructions.dto";
import { ConstructionsService } from "./constructions.service";

@Controller("construction")
@ApiTags("Constructions/obra")
export class ConstructionsController {
  private readonly _logger = new Logger(ConstructionsController.name);

  constructor(private constructionsService: ConstructionsService) {}

  @Post("register/:demandId")
  // @ApiBearerAuth()
  // @UseGuards(JwtAccessTokenGuard)
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
        constructions: {
          type: "array",
          items: {
            type: "object",
            properties: {
              roomSolutionId: { type: "string" },
            },
          },
        },
        type: { type: "string" },
        area: { type: "string" },
        description: { type: "string" },
      },
    },
  })
  async register(
    @Param("demandId") demandId: string,
    @Body() dto: CreateConstructionsDto,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    let constructionsArray;

    if (typeof dto.constructions === "string") {
      try {
        constructionsArray = JSON.parse(`[${dto.constructions}]`);
      } catch (error) {
        console.error("Erro ao parsear constructions:", error);
        throw new BadRequestException("Invalid constructions format");
      }
    } else {
      constructionsArray = dto.constructions;
    }

    dto.constructions = constructionsArray;

    return await this.constructionsService.register(dto, files, demandId);
  }

  @Put("update")
  @ApiBearerAuth()
  @UseGuards(JwtAccessTokenGuard)
  async update() {}
}
