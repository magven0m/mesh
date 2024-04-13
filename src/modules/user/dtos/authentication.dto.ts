import { OmitType } from '@nestjs/swagger';
import { RegistrationDTO } from './registration.dto';

export class AuthenticationDTO extends OmitType(RegistrationDTO, ['nickname']) {}
