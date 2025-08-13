import { Injectable } from "@nestjs/common";
import { BaseRepository } from "../../../../../core/repositories/base.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BidDocumentEntity } from "../../entitites/bid-document.entity";
import { BidDocumentRequestDto } from "../../dtos/bidDocument/bid-document-create.dto";

@Injectable()
export class BidDocumentRepository extends BaseRepository<
  BidDocumentEntity,
  BidDocumentRequestDto,
  BidDocumentRequestDto
> {
  constructor(
    @InjectRepository(BidDocumentEntity)
    private repository: Repository<BidDocumentEntity>,
  ) {
    super(repository);
  }

  async findById(costEstimateId: string): Promise<BidDocumentEntity> {
    return await this.repository.findOne({
      where: { id: costEstimateId },
   //   relations: [ 'workRequest', 'workRequest.room'],
    });
  }
  async find(): Promise<BidDocumentEntity[]> {
    return await this.repository.find({
      //relations: ['workRequest', 'workRequest.room'],
    });
  }


}