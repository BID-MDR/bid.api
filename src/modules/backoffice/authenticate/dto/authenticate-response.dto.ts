export class AuthenticateResponseDto {
    constructor(
        public id: string,
        public email: string,
        public token: string,
        public dateExpirated?: Date
    ) { }
  }