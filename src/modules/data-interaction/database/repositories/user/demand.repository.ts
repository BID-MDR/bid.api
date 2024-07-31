import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepository } from "src/core/repositories/base.repository";
import { DeepPartial, Repository } from "typeorm";
import { DemandEntity } from "../../entitites/demand.entity";
import { DemandRegisterRequestDto } from "../../dtos/demand/register-demand.dto";
import { UserEntity } from "../../entitites/user.entity";

@Injectable()
export class DemandRepository extends BaseRepository<
    DemandEntity,
    DemandRegisterRequestDto,
    DeepPartial<DemandEntity>
> {
    constructor(
        @InjectRepository(DemandEntity)
        private repository: Repository<DemandEntity>,
    ) {
        super(repository);
    }

    async getById(_id: string) {
        return this.repository.findOne({ where: { id: _id } });
    }

    async listByUser(userId: string): Promise<DemandEntity[]> {
        const query = this.repository
            .createQueryBuilder("demand")
            .innerJoinAndSelect("demand.beneficiary", "beneficiary")
            .innerJoinAndSelect("demand.professional", "professional")
            .leftJoinAndSelect("demand.workRequest", "workRequest")
            .leftJoinAndSelect("demand.technicalVisit", "technicalVisit")
            .leftJoinAndSelect("workRequest.room", "room")
            .leftJoinAndSelect("workRequest.welfare", "welfare")
            .leftJoinAndSelect("demand.construction", "constructions")
            .where("beneficiary.id = :userId", { userId })
            .orWhere("professional.id = :userId", { userId });

        return await query.getMany();
    }

    async getByWorkRequestId(workRequestId: string): Promise<DemandEntity[]> {
        const query = this.repository
            .createQueryBuilder("demand")
            .innerJoinAndSelect("demand.beneficiary", "beneficiary")
            .innerJoinAndSelect("demand.professional", "professional")
            .leftJoinAndSelect("demand.workRequest", "workRequest")
            .leftJoinAndSelect("demand.technicalVisit", "technicalVisit")
            .leftJoinAndSelect("workRequest.room", "room")
            .leftJoinAndSelect("workRequest.welfare", "welfare")
            .where("workRequest.id = :workRequestId", { workRequestId })

        return await query.getMany();
    }

    async list() {
        return this.repository.find();
    }
}
