import { createModule } from '@evyweb/ioctopus';
import { DatabaseClientService } from '../services/database-client.service';
import { SERVICE_DI_SYMBOLS } from '../types';

export function createDatabaseClientModule() {
  const databaseClientModule = createModule();

  if (process.env.NODE_ENV === 'test') {
    databaseClientModule
      .bind(SERVICE_DI_SYMBOLS.IDatabaseClientService)
      .toHigherOrderFunction(DatabaseClientService);
  } else {
    databaseClientModule
      .bind(SERVICE_DI_SYMBOLS.IDatabaseClientService)
      .toHigherOrderFunction(DatabaseClientService);
  }

  return databaseClientModule;
}
