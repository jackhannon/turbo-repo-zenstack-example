import { IDatabaseClientService } from '@sample/database/access';
import { IAuthenticationService } from '../services/interfaces/authentication-client.service.interface';

export const SERVICE_DI_SYMBOLS = {
  // Services
  IAuthenticationService: Symbol.for('IAuthenticationService'),
  IDatabaseClientService: Symbol.for('IDatabaseClientService'),
};

export interface SERVICE_DI_RETURN_TYPES {
  // Services
  IAuthenticationService: IAuthenticationService;
  IDatabaseClientService: IDatabaseClientService;
} 