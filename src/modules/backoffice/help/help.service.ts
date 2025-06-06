import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/services/base.service';
import { WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserRepository } from 'src/modules/data-interaction/database/repositories/user/user.repository';
import { HelpEntity } from 'src/modules/data-interaction/database/entitites/help.entity';
import { HelpRegisterRequestDto } from 'src/modules/data-interaction/database/dtos/help/register-help.dto';
import { HelpRepository } from 'src/modules/data-interaction/database/repositories/user/help.repository';
import { HelpStatusEnum } from 'src/modules/data-interaction/database/dtos/help/helpStatus.enum';

@Injectable()
export class HelpBackofficeService extends BaseService<
    HelpEntity,
    HelpRegisterRequestDto,
    HelpRegisterRequestDto
> {
    @WebSocketServer() server: Server;
    constructor(
        private helpRepository: HelpRepository,
        private readonly userRepository: UserRepository,
    ) {
        super(helpRepository);
    }

    async getByMonth(month: number){
        return await this.helpRepository.findMonth(month);
    }

    async register(clientId: string, data: HelpRegisterRequestDto) {
        data.user = await this.userRepository.getById(clientId);
        data.sentAt = new Date()
        const help =  await super.create(data);
        return help
    }

    async delete(helpId: string) {
        return await this.helpRepository.hardDelete(helpId);
    }
    async getById(helpId: string) {
        return await this.helpRepository.getById(helpId);
    }

    async listByUser(userId: string) {
        const user = await this.userRepository.getById(userId)
        return await this.helpRepository.listAllMsgByUser(user);
    }

    async list() {
        return await this.helpRepository.list();
    }



    async updateStatus(id: string, status: string){
        if(status == HelpStatusEnum.OPEN)
            return await this.helpRepository.update(id, {status: HelpStatusEnum.OPEN})
        if(status == HelpStatusEnum.SOLVED)
            return await this.helpRepository.update(id, {status: HelpStatusEnum.SOLVED})
    }

    async listMcmv() {
        return await this.helpRepository.listMcmv();
    }

    async getByMonthMcmv(month: number){
        return await this.helpRepository.findMonthMcmv(month);
    }
    
}
