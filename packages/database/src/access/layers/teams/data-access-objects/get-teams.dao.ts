import {  ITeamRepository } from '../repository';
import { RetrieveManyParams } from '@sample/database/access/types/arguments.types';

export type IGetTeamsDAO = ReturnType<typeof getTeamsDAO>;

export const getTeamsDAO =
  ({ teamRepository }: { teamRepository: ITeamRepository }) =>
  async (params?: RetrieveManyParams<'Team'>) => {
    const teams = await teamRepository.getTeams(params);

    return teams;
  }; 