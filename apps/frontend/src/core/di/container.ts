import { createContainer } from '@evyweb/ioctopus';

// Services
import { createAuthenticationModule } from './service-modules/authentication.module';
import { createDatabaseClientModule } from './service-modules/database.module';
import { DI_SYMBOLS, DI_RETURN_TYPES } from './types';

import { createTeamModule } from './app-modules/team.module';

const ApplicationContainer = createContainer();

ApplicationContainer.load(Symbol('DatabaseClientModule'), createDatabaseClientModule());
ApplicationContainer.load(Symbol('AuthenticationClientModule'), createAuthenticationModule());
ApplicationContainer.load(Symbol('TeamModule'), createTeamModule());


export function getInjection<K extends keyof DI_RETURN_TYPES>(symbol: K): DI_RETURN_TYPES[K] {
  return ApplicationContainer.get((DI_SYMBOLS)[symbol]);
}


const teamRepository = getInjection('ITeamRepository');