import { withDatabaseError } from '@sample/database/access/utils/with-database-error';
import { IDatabaseClientService } from '@sample/database/access/types/services/database-client.service.interface';
import { RetrieveManyParams } from '@sample/database/access/types/arguments.types';
import { BaseRepository } from '@sample/database/access/repository';

export class TeamRepository extends BaseRepository implements ITeamRepository {
  constructor(databaseClientService: IDatabaseClientService) {
    super(databaseClientService);
  }

  async getTeams(params?: RetrieveManyParams<'Team'>) {
    const prismaParams = this.convertRetrieveManyParams(params);
    return withDatabaseError(async () => {
      return this.databaseClientService.team.findMany({
          ...prismaParams,
      });
    });
  }   
}

export interface ITeamRepository {
  getTeams(params?: RetrieveManyParams<'Team'>): ReturnType<TeamRepository['getTeams']>;
}