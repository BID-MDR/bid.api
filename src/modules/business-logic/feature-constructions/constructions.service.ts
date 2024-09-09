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

  async firstStepPhotos(
    roomSolutionId: string,
    files: Array<Express.Multer.File>,
    demandId: string,
    companyId: string
  ) {
    if (!files.length) {
      throw new BadRequestException("Files are required");
    }

    const demand = await this.demandRepository.findById(demandId);

    if (!demand) {
      throw new BadRequestException("Demand not found");
    }

    if (demand.company.id !== companyId) {
      throw new BadRequestException("Not authorized to access this demand");
    }

    const roomSolutions = demand.workRequest.room
      .map(room => room.roomSolutions)
      .filter(a => !!a)
      .flat();

    if (!roomSolutions.some(roomSolution => roomSolution.id === roomSolutionId)) {
      throw new BadRequestException("Room solution not found");
    }

    const roomSolution = await this.roomSolutionService.findById(roomSolutionId);
    if (!roomSolution) {
      throw new BadRequestException("Room solution not found");
    }

    for (const file of files) {
      const name = "construction-" + new Date().getTime();
      const url = await this.S3.uploadMediaBuffer(file.mimetype, name, file.buffer);
      const userMidia = await this.userGeneratedMediaRepository.create({
        url,
        mimeType: file.mimetype,
        type: MediaTypeEnum.FOTO,
      });
      roomSolution.picturesAndVideos.push(userMidia);
    }
    await roomSolution.save();

    await demand.reload();

    return demand;
  }

  async secondStepConstructions(dto: CreateConstructionsDto, demandId: string, companyId: string) {
    const demand = await this.demandRepository.findById(demandId);

    if (!demand) {
      throw new BadRequestException("Demand not found");
    }

    if (demand.company.id !== companyId) {
      throw new BadRequestException("Not authorized to access this demand");
    }

    const constructions = await this.constructionsRepository.create({
      type: dto.type,
      area: +dto.area,
      description: dto.description,
      status: ConstructionsStatusEnum.EM_ANDAMENTO,
    });

    demand.construction = constructions;
    demand.status = DemandStatusEnum.CONCLUIR_OBRAS;

    return await demand.save();
  }

  async update(dto: CreateConstructionsDto, demandId: string, companyId: string) {
    const demand = await this.demandRepository.findById(demandId);

    if (!demand) {
      throw new BadRequestException("Demand not found");
    }

    if (demand.company.id !== companyId) {
      throw new BadRequestException("Not authorized to access this demand");
    }

    const constructions = await this.constructionsRepository.findById(demand.construction.id);

    if (!constructions) {
      throw new BadRequestException("Constructions not found");
    }

    constructions.type = dto.type;
    constructions.area = +dto.area;
    constructions.description = dto.description;

    return await constructions.save();
  }

  async deletePhoto(demandId: string, photoId: string) {
    const demand = await this.demandRepository.findById(demandId);

    if (!demand) {
      throw new BadRequestException("Demand not found");
    }

    const roomSolutions = demand.workRequest.room
      .map(room => room.roomSolutions)
      .filter(a => !!a)
      .flat();

    const roomSolution = roomSolutions.find(roomSolution => roomSolution.picturesAndVideos.some(p => p.id === photoId));

    if (!roomSolution) {
      throw new BadRequestException("Room solution not found");
    }

    const photo = roomSolution.picturesAndVideos.find(p => p.id === photoId);

    if (!photo) {
      throw new BadRequestException("Photo not found");
    }

    roomSolution.picturesAndVideos = roomSolution.picturesAndVideos.filter(p => p.id !== photoId);
    await roomSolution.save();

    await this.S3.deleteMedia(photo.url);
    await this.userGeneratedMediaRepository.hardDelete(photoId);

    await demand.reload();

    return demand;
  }

  async list() {
    return await this.constructionsRepository.findAll();
  }

  async listByMonth(month:number){
    return await this.constructionsRepository.findMonth(month)
  }

  async getById(constructionsId: string) {
    return await this.constructionsRepository.findById(constructionsId);
  }

  async validatePhotos(constructionsId: string) {
    const constructions = await this.getById(constructionsId);

    if (!constructions) {
      throw new BadRequestException("Constructions not found");
    }

    constructions.status = ConstructionsStatusEnum.EM_ANDAMENTO;

    return await constructions.save();
  }

  async cancel(constructionsId: string) {
    const constructions = await this.getById(constructionsId);

    if (!constructions) {
      throw new BadRequestException("Constructions not found");
    }

    const demand = await this.demandRepository.getByConstructionId(constructionsId);

    demand.status = DemandStatusEnum.CANCELADO;
    await demand.save();

    constructions.status = ConstructionsStatusEnum.CANCELADA;

    return await constructions.save();
  }

  async conclude(constructionsId: string, companyId: string) {
    const constructions = await this.getById(constructionsId);

    if (!constructions) {
      throw new BadRequestException("Constructions not found");
    }

    const demand = await this.demandRepository.getByConstructionId(constructionsId);

    if (demand.company.id !== companyId) {
      throw new BadRequestException("Not authorized to access this demand");
    }

    demand.status = DemandStatusEnum.ESPERANDO_VALIDACAO;
    await demand.save();

    constructions.status = ConstructionsStatusEnum.CONCLUIDA;

    return await constructions.save();
  }
}
