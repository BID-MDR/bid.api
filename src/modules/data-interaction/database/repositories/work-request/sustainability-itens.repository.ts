import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/core/repositories/base.repository";
import { SustainabilityItensEntity } from "../../entitites/sustainability-Itens.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SustainabilityItensRequestDto } from "../../dtos/work-request/sustainability-itens-request.dto";

@Injectable()
export class SustainabilityItensRepository extends BaseRepository<SustainabilityItensEntity, SustainabilityItensRequestDto, any> {
    constructor(
        @InjectRepository(SustainabilityItensEntity)
        private repository: Repository<SustainabilityItensEntity>,
    ) {
        super(repository);
    }
}