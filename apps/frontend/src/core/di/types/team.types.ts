import { ITeamRepository } from '@sample/database/access';
import { IGetTeamsController } from '@sample/database/access';   
import { IGetTeamsDAO } from '@sample/database/access';



export const TEAM_DI_SYMBOLS = {
  // Repositories
  ITeamRepository: Symbol.for('ITeamRepository'),

  // DAOs
  IGetTeamsDAO: Symbol.for('IGetTeamsDAO'),

  // Controllers
  IGetTeamsController: Symbol.for('IGetTeamsController'),

};

export interface TEAM_DI_RETURN_TYPES {
  // Repositories
  ITeamRepository: ITeamRepository;

  // DAOs
  IGetTeamsDAO: IGetTeamsDAO;

  // Controllers
  IGetTeamsController: IGetTeamsController;
} 