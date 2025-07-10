import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { UserBackofficeEntity } from "src/modules/data-interaction/database/entitites/user-backoffice.entity";
import { UserBackofficeRepository } from "src/modules/data-interaction/database/repositories/backoffice/user/user.repository";
import { AuthenticateRequestDto } from "./dto/authenticate-request.dto";
import { AuthenticateResponseDto } from "./dto/authenticate-response.dto";
import { EnviromentVariablesEnum } from "src/core/enums/environment-variables.enum";
import { JwtPayloadBackoffice } from "src/core/interfaces/jwt-payload-backoffice.interface";
import { UserBackofficeTypeEnum } from "../user/dto/userTypeEnum";
import { UserRolesBackofficeEntity } from "src/modules/data-interaction/database/entitites/user-roles-backoffice.entity";
import { UserProgramTypeEnum } from "src/modules/data-interaction/database/enums/user-program-type.enum";
import { ResponseDto } from "src/core/dtos/response.dto";

@Injectable()
export class AuthenticateService {
  constructor(
    private readonly _userRepository: UserBackofficeRepository,
    private readonly _configService: ConfigService,
    private readonly _jwtService: JwtService,
  ) { }

  private async validate(email: string, password: string): Promise<UserBackofficeEntity> {

    const user = await this._userRepository.getByEmail(email);

    const hashedPassword = await bcrypt.hash(password, 10);

    if (user) {
      if (await bcrypt.compare(password, user.password)) return user;
    }

    return null;
  }

  async authenticateBid(
    dto: AuthenticateRequestDto,
  ): Promise<AuthenticateResponseDto> {
    const user = await this.validate(dto.email, dto.password);

    if (!user)  throw new HttpException(
      new ResponseDto(false, null, ['E-mail ou senha incorreto!']),
      HttpStatus.BAD_REQUEST
    );

    if (user.programType != UserProgramTypeEnum.REGMEL) {
      throw new HttpException(
        new ResponseDto(false, null, ['Tipo de programa incorreto']),
        HttpStatus.BAD_REQUEST
      );
    }

    const token = this._createToken(user.id.toString(), user.email, user.roles);

    const verify = await this._userRepository.getById(user.id.toString());

    if (verify.type === UserBackofficeTypeEnum.BACKOFFICE) {
      if (verify.programType === UserProgramTypeEnum.REGMEL) {
        return new AuthenticateResponseDto(user.id, user.email, token.accessToken);
      }
    }

    if (verify.lastAccess) {
      const lastAccessDate = new Date(verify.lastAccess);
      lastAccessDate.setMinutes(lastAccessDate.getMinutes() + verify.timeView);
      const dateCompare = lastAccessDate.getTime();
      const dateNow = new Date().getTime()
      if (dateCompare >= dateNow) {
        return new AuthenticateResponseDto(user.id, user.email, token.accessToken, lastAccessDate);
      } else {
        throw new BadRequestException('Login não autorizado');
      }
    }

    const newDate = new Date()


    const dateLastLogin = new Date(newDate.setMinutes(newDate.getMinutes() + verify.timeView));
    await this._userRepository.updateLastAccess(verify.id.toString(), new Date());
    return new AuthenticateResponseDto(user.id, user.email, token.accessToken, dateLastLogin);
  }

  async authenticateMCMV(
    dto: AuthenticateRequestDto,
  ): Promise<AuthenticateResponseDto> {
    const user = await this.validate(dto.email, dto.password);

    if (!user) throw new NotFoundException('Invalid email and password!');

    if (user.programType == UserProgramTypeEnum.REGMEL) {
      throw new NotFoundException('Tipo de programa incorreto');
    }
    
    const token = this._createToken(user.id.toString(), user.email, user.roles);

    const verify = await this._userRepository.getById(user.id.toString());
    const lastLogin = verify.lastAccess
    await this._userRepository.updateLastAccess(verify.id.toString(), new Date());
    if (verify.type === UserBackofficeTypeEnum.BACKOFFICE) {

      return new AuthenticateResponseDto(user.id, user.email, token.accessToken);

    }

    return new AuthenticateResponseDto(user.id, user.email, token.accessToken, lastLogin);
  
  

    // if (verify.lastAccess) {
    //   const lastAccessDate = new Date(verify.lastAccess);
    //   lastAccessDate.setMinutes(lastAccessDate.getMinutes() + verify.timeView);
    //   const dateCompare = lastAccessDate.getTime();
    //   const dateNow = new Date().getTime()
    //   if (dateCompare >= dateNow) {
    //     return new AuthenticateResponseDto(user.id, user.email, token.accessToken, lastAccessDate);
    //   } else {
    //     throw new BadRequestException('Login não autorizado');
    //   }
    // }

    // const newDate = new Date()


    // const dateLastLogin = new Date(newDate.setMinutes(newDate.getMinutes() + verify.timeView));
    // await this._userRepository.updateLastAccess(verify.id.toString(), new Date());
    // return new AuthenticateResponseDto(user.id, user.email, token.accessToken, dateLastLogin);
  }

  private _createToken(userId: string, email: string, roles: UserRolesBackofficeEntity[]) {
    const user: JwtPayloadBackoffice = { userId, email, roles };
    const expiresIn = this._configService.get(
      EnviromentVariablesEnum.JWT_ACCESS_TOKEN_EXPIRATION,
    );
    const accessToken = this._jwtService.sign(user, { expiresIn });
    return { accessToken, expiresIn };
  }
}