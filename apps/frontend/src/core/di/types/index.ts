export * from './services.types';
export * from './team.types';

import { SERVICE_DI_SYMBOLS } from './services.types';
import { TEAM_DI_SYMBOLS } from './team.types';


export const DI_SYMBOLS = {
  ...SERVICE_DI_SYMBOLS,
  ...TEAM_DI_SYMBOLS,
};

import { SERVICE_DI_RETURN_TYPES } from './services.types';

import { TEAM_DI_RETURN_TYPES } from './team.types';


export interface DI_RETURN_TYPES
  extends SERVICE_DI_RETURN_TYPES,
    TEAM_DI_RETURN_TYPES {}
