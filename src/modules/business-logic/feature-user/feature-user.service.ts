import { Injectable } from "@nestjs/common";

@Injectable()
export class FeatureUserService {
    constructor() {}

    async createContactRequest(dto: CreateContactRequestDto) {
        const contactRequest = await this.contactRequestRepository.create(dto);

        await this.emailFacade.sendContactRequest(
            {
                to: this.configService.getOrThrow(EnviromentVariablesEnum.MAILJET_CONTACT_RECEIVER),
            },
            contactRequest,
        );
    }
}
