export class AuthenticateResponseDto {
    constructor(
        public email: string,
        public token: string,
        public dateExpirated?: Date
    ) { }
  }