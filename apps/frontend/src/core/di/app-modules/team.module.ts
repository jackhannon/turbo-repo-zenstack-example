import { createModule } from '@evyweb/ioctopus';
import { DI_SYMBOLS } from '../types';
import { TeamRepository, getTeamsController, getTeamsDAO } from '@sample/database/access';
import { TEAM_DI_SYMBOLS } from '../types/team.types';


export function createTeamModule() {
  const teamModule = createModule();
  
  teamModule
    .bind(TEAM_DI_SYMBOLS.ITeamRepository)
    .toClass(TeamRepository, [DI_SYMBOLS.IDatabaseClientService]);

  // Team controllers
  teamModule.bind(TEAM_DI_SYMBOLS.IGetTeamsController).toHigherOrderFunction(getTeamsController, {
    authenticationService: DI_SYMBOLS.IAuthenticationService,
    getTeamsDAO: TEAM_DI_SYMBOLS.IGetTeamsDAO,
  });

  // Team DAOs
  teamModule.bind(TEAM_DI_SYMBOLS.IGetTeamsDAO).toHigherOrderFunction(getTeamsDAO, {
    teamRepository: TEAM_DI_SYMBOLS.ITeamRepository,
  });

  return teamModule;
}
