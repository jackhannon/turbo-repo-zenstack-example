
import {IGetTeamsDAO} from '../data-access-objects/get-teams.dao';
import {RetrieveManyParams} from '@sample/database/access/types/arguments.types';

export type IGetTeamsController = ReturnType<typeof getTeamsController>;

export const getTeamsController =
  ({
    getTeamsDAO,
  }: {
    getTeamsDAO: IGetTeamsDAO;
  }) =>
    async (params?: RetrieveManyParams<'Team'>) => {
      const teams = await getTeamsDAO(params);
      return teams;
    };