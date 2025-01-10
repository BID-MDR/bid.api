import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { BaseService } from "../../../core/services/base.service";
import { BidDocumentRepository } from "src/modules/data-interaction/database/repositories/bidDocument/bidDocument.repository";
import { BidDocumentRequestDto } from "src/modules/data-interaction/database/dtos/bidDocument/bid-document-create.dto";
import { BidDocumentEntity } from "src/modules/data-interaction/database/entitites/bid-document.entity";
import { StorageFacade } from "src/modules/data-interaction/facade/apis/storage/storage.facade";

@Injectable()
export class BidDocumentService extends BaseService<BidDocumentEntity, BidDocumentRequestDto, BidDocumentRequestDto> {
  constructor(
    private repository: BidDocumentRepository,
    private readonly storageFacade: StorageFacade
 
  ) {
    super(repository);
  }

  async list() {
    return await this.repository.find();
  }

  async getById(bidDocumentId: string) {
    return await this.repository.findById(bidDocumentId);
  }


  async register(data: BidDocumentRequestDto) {
    data.documentLink = await this.storageFacade.uploadMedia(
      data.documentMedia.mimeType,
      data.documentMedia.fileName,
      data.documentMedia.data,
  );
    return await this.repository.create(data);
}


 
  async delete(costEstimateId: string) {
    return await this.repository.hardDelete(costEstimateId);
  }


}
