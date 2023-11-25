import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/data-interaction/database/entitites/user.entity';
import { FeatureUserService } from './feature-user.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [FeatureUserService],
    controllers: [UserController],
})
export class FeatureUserModule {}
