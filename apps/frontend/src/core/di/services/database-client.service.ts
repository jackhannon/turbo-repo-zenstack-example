import type { IDatabaseClientService } from './interfaces/database-client.service.interface';
import { prismaClient } from './client/client';
import { enhance } from '@sample/database/client';

export const DatabaseClientService = (): IDatabaseClientService => { 
  const databaseClientService = prismaClient as IDatabaseClientService;
  const enhancedDatabaseClientService = enhance(databaseClientService, { user: { id: '123' } });

  return enhancedDatabaseClientService;
};
