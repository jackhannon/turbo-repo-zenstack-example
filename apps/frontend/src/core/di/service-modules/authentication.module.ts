import { createModule } from '@evyweb/ioctopus';
import { SERVICE_DI_SYMBOLS } from '../types';
import { AuthenticationClientService } from '../services/authentication-client.service';

export function createAuthenticationModule() {
  const authenticationModule = createModule();

  authenticationModule
    .bind(SERVICE_DI_SYMBOLS.IAuthenticationService)
    .toClass(AuthenticationClientService);

  return authenticationModule;
}
