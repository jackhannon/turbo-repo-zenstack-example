import { PrismaClient } from '../../../client';

export interface IDatabaseClientService extends InstanceType<typeof PrismaClient> {}