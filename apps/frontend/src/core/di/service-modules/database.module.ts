import { createModule } from '@evyweb/ioctopus';
import { DatabaseClientService } from '../services/database-client.service';
import { SERVICE_DI_SYMBOLS } from '../types';

export function createDatabaseClientModule() {
  const databaseClientModule = createModule();
  databaseClientModule
    .bind(SERVICE_DI_SYMBOLS.IDatabaseClientService)
    .toHigherOrderFunction(DatabaseClientService);

  return databaseClientModule;
}
