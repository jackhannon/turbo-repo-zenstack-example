import { Prisma } from '@sample/database/prisma/generated/prisma/client';
import { ModelName } from '@sample/database/prisma/generated/prisma/internal/prismaNamespace';

export type { ModelName } from '@sample/database/prisma/generated/prisma/internal/prismaNamespace';
export type { Prisma } from '@sample/database/prisma/generated/prisma/client';
export type ModelFields<N extends ModelName> = keyof Prisma.TypeMap['model'][N]['fields'];

export type ModelNameWithoutViews = {
  [K in ModelName]: 'create' extends keyof Prisma.TypeMap['model'][K]['operations'] ? K : never;
}[ModelName];

export type Views = {
  [K in ModelName]: 'create' extends keyof Prisma.TypeMap['model'][K]['operations'] ? never : K;
}[ModelName];

export type CheckedInput<N extends ModelNameWithoutViews> =
  N extends 'Team' ? Prisma.TeamCreateInput :
  never;
