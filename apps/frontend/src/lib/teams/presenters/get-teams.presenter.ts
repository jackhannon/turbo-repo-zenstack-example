import { getInjection } from "~/core/di/container";
import { RetrieveManyParams } from "@sample/database/access";

export const getTeams = async (params?: RetrieveManyParams<'Team'>) => {
  const getTeamsController = getInjection('IGetTeamsController');
  const teams = await getTeamsController(params);
  return teams;
};