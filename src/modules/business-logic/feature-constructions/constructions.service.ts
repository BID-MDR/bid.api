import { BadRequestException, Injectable } from "@nestjs/common";
import { RoomSolutionRepository } from "src/modules/data-interaction/database/repositories/room/room-solution.repository";
import { CreateConstructionsDto } from "../../data-interaction/database/dtos/constructions/create-constructions.dto";
import { UserGeneratedMediaRepository } from "../../data-interaction/database/repositories/user/user-generated-media.repository";
import { AwsSubsystem } from "../../data-interaction/facade/apis/storage/aws.subsystem";
import { MediaTypeEnum } from "../../data-interaction/database/enums/media-type.enum";
import { ConstructionsRepository } from "../../data-interaction/database/repositories/constructions.repository";
import { DemandRepository } from "../../data-interaction/database/repositories/user/demand.repository";
import { DemandStatusEnum } from "../../data-interaction/database/enums/demand-status.enum";
import { ConstructionsStatusEnum } from "src/modules/data-interaction/database/enums/constructions-stauts.enum";

@Injectable()
export class ConstructionsService {
  constructor(
    private readonly demandRepository: DemandRepository,
    private readonly constructionsRepository: ConstructionsRepository,
    private readonly roomSolutionService: RoomSolutionRepository,
    private readonly userGeneratedMediaRepository: UserGeneratedMediaRepository,
    private readonly S3: AwsSubsystem
  ) {}

  async register(dto: CreateConstructionsDto, files: Array<Express.Multer.File>, demandId: string) {
    const demand = await this.demandRepository.findById(demandId);

    if(!demand) {
      throw new BadRequestException("Demand not found");
    }

    if(!dto.constructions.length || !files.length) {
      throw new BadRequestException("Files and constructions are required");
    }

    if(dto.constructions.length !== files.length) {
      throw new BadRequestException("Number of files and constructions do not match");
    }

    const roomSolutions = demand.workRequest.room.map((room) => room.roomSolutions).filter((a)=> !!a).flat();

    for(const construction of dto.constructions) {
      if(!roomSolutions.find((roomSolution) => roomSolution.id === construction.roomSolutionId)) {
        throw new BadRequestException("Room solution not found");
      }
    }

    dto.constructions.forEach(async (construction, idx) => {
      const roomSolution = await this.roomSolutionService.findById(construction.roomSolutionId);
      if (!roomSolution) {
        throw new BadRequestException("Room solution not found");
      }
      if (files[idx]) {
        const file = files[idx];
        const name = "construction-" + new Date().getTime();
        const url = await this.S3.uploadMediaBuffer(file.mimetype, name, file.buffer);
        const userMidia = await this.userGeneratedMediaRepository.create({
          url,
          mimeType: file.mimetype,
          type: MediaTypeEnum.FOTO,
        });
        roomSolution.picturesAndVideos.push(userMidia);
        await roomSolution.save();
      }
    });

    const constructions = await this.constructionsRepository.create({
      type: dto.type,
      area: +dto.area,
      description: dto.description,
      status:ConstructionsStatusEnum.EM_ANDAMENTO,
    });

    demand.construction = constructions;
    demand.status = DemandStatusEnum.CONCLUIR_OBRAS;

    await demand.save();
  }

  async list() {
    return await this.constructionsRepository.findAll();
  }

  async getById(constructionsId: string) {
    return await this.constructionsRepository.findById(constructionsId);
  }

  async validatePhotos(constructionsId: string) {
    const constructions = await this.getById(constructionsId);

    if(!constructions) {
      throw new BadRequestException("Constructions not found");
    }

    constructions.status = ConstructionsStatusEnum.EM_ANDAMENTO;

    return await constructions.save();
  }

  async cancel(constructionsId: string) {
    const constructions = await this.getById(constructionsId);

    if(!constructions) {
      throw new BadRequestException("Constructions not found");
    }

    const demand = await this.demandRepository.getByConstructionId(constructionsId);

    demand.status = DemandStatusEnum.CANCELADO;
    await demand.save();

    constructions.status = ConstructionsStatusEnum.CANCELADA;

    return await constructions.save();
  }

  async conclude(constructionsId: string) {
    const constructions = await this.getById(constructionsId);

    if(!constructions) {
      throw new BadRequestException("Constructions not found");
    }

    const demand = await this.demandRepository.getByConstructionId(constructionsId);

    demand.status = DemandStatusEnum.CONCLUIDO;
    await demand.save();

    constructions.status = ConstructionsStatusEnum.CONCLUIDA;

    return await constructions.save();
  }
}
