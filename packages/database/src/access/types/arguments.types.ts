/**
 * Generic sorting and query options for database operations
 * This abstraction allows UI-level control over ordering without coupling to specific ORM implementations
 */

import { ModelName, Prisma } from '../../client';
import { CheckedInput, ModelFields, ModelNameWithoutViews, Views } from './prisma.types';


export type SortDirection = 'asc' | 'desc';

export type SortOption<N extends ModelName> = {
  field: ModelFields<N>;
  direction: SortDirection;
};

export type SearchCriteria<T extends ModelName> = {
  [K in keyof Prisma.TypeMap['model'][T]['fields']]?: Prisma.TypeMap['model'][T]['fields'][K] extends Prisma.FieldRef<
    infer Model,
    infer FieldType
  >
    ? FieldType extends 'String'
      ? string
      : FieldType extends 'Int'
        ? number
        : FieldType extends 'Float'
          ? number
          : FieldType extends 'Boolean'
            ? boolean
            : FieldType extends 'DateTime'
              ? Date
              : FieldType extends 'Json'
                ? any
                : FieldType extends 'Bytes'
                  ? Uint8Array
                  : FieldType extends 'BigInt'
                    ? bigint
                    : FieldType extends 'Decimal'
                      ? Prisma.Decimal
                      : FieldType extends 'Enum'
                        ? any
                        : any
    : Prisma.TypeMap['model'][T]['fields'][K];
};

export type SearchCriteriaWithUniqueConstraint<N extends ModelNameWithoutViews> =
  Prisma.TypeMap['model'][N]['operations']['findUnique']['args']['where'];

// Flexible search criteria that accepts both regular and unique constraints
export type FlexibleSearchCriteria<N extends ModelName> =
  | SearchCriteria<N>
  | (N extends ModelNameWithoutViews
      ? Prisma.TypeMap['model'][N]['operations']['findUnique']['args']['where']
      : never);

export type RepositoryOperationTypes =
  | 'RetrieveMany'
  | 'RetrieveFirst'
  | 'RetrieveUnique'
  | 'CreateMany'
  | 'CreateOne'
  | 'UpdateMany'
  | 'UpdateOne'
  | 'DeleteOne';

export namespace PrismaRepositoryOperationParams {
  export type RetrieveManyParams<N extends ModelName> =
    Prisma.TypeMap['model'][N]['operations']['findMany']['args'];
  export type RetrieveUniqueParams<N extends ModelNameWithoutViews> =
    Prisma.TypeMap['model'][N]['operations']['findUnique']['args'];
  export type RetrieveFirstParams<N extends ModelName> =
    Prisma.TypeMap['model'][N]['operations']['findFirst']['args'];
  export type CreateManyParams<N extends ModelNameWithoutViews> =
    Prisma.TypeMap['model'][N]['operations']['createMany']['args'];
  export type UpdateManyParams<N extends ModelNameWithoutViews> =
    Prisma.TypeMap['model'][N]['operations']['updateMany']['args'];
  export type CreateOneParams<N extends ModelNameWithoutViews> =
    Prisma.TypeMap['model'][N]['operations']['create']['args'];
  export type UpdateOneParams<N extends ModelNameWithoutViews> =
    Prisma.TypeMap['model'][N]['operations']['update']['args'];
  export type DeleteOneParams<N extends ModelNameWithoutViews> =
    Prisma.TypeMap['model'][N]['operations']['delete']['args'];
}

export type RetrieveManyParams<N extends ModelName> = {
  searchCriteria?: FlexibleSearchCriteria<N>;
  orderBy?: SortOption<N>;
  skip?: number;
  take?: number;
};

export type RetrieveUniqueParams<N extends ModelNameWithoutViews> = {
  searchCriteria: SearchCriteriaWithUniqueConstraint<N>;
};

export type RetrieveFirstParams<N extends ModelName> = {
  searchCriteria?: FlexibleSearchCriteria<N>;
  orderBy?: SortOption<N>;
};

export type CreateManyParams<N extends ModelNameWithoutViews> = {
  data: Prisma.TypeMap['model'][N]['operations']['createMany']['args']['data'];
};

export type CreateOneParams<N extends ModelNameWithoutViews> = {
  data: CheckedInput<N>;
};

export type UpdateManyParams<N extends ModelNameWithoutViews> = {
  searchCriteria: SearchCriteria<N>;
  data: Prisma.TypeMap['model'][N]['operations']['updateMany']['args']['data'];
};

export type UpdateOneParams<N extends ModelNameWithoutViews> = {
  searchCriteria: SearchCriteriaWithUniqueConstraint<N>;
  data: Prisma.TypeMap['model'][N]['operations']['update']['args']['data'];
};

// For upsert operations, we should use UncheckedCreateInput to ensure required fields like 'id' are included
export type UpsertOneParams<N extends ModelNameWithoutViews> = {
  searchCriteria: SearchCriteriaWithUniqueConstraint<N>;
  create: Prisma.TypeMap['model'][N]['operations']['upsert']['args']['create'];
  update: Prisma.TypeMap['model'][N]['operations']['upsert']['args']['update'];
};

export type UpsertManyParams<N extends ModelNameWithoutViews> = {
  data: {
    searchCriteria: SearchCriteriaWithUniqueConstraint<N>;
    create: Prisma.TypeMap['model'][N]['operations']['upsert']['args']['create'];
    update: Prisma.TypeMap['model'][N]['operations']['upsert']['args']['update'];
  }[];
};

export type DeleteOneParams<N extends ModelNameWithoutViews> = {
  searchCriteria: SearchCriteriaWithUniqueConstraint<N>;
};

export type RetrieveManyFromViewParams<N extends Views> = {
  searchCriteria?: FlexibleSearchCriteria<N>;
  skip?: number;
  take?: number;
  orderBy?: SortOption<N>;
};

export type RetrieveFirstFromViewParams<N extends Views> = {
  searchCriteria?: FlexibleSearchCriteria<N>;
  orderBy?: SortOption<N>;
};

// Helper function to convert generic repository operation params to Prisma params
export const createPrismaOrderBy = <N extends ModelName | Views>(sort?: SortOption<N>) => {
  return sort ? { [sort.field]: sort.direction } : {};
};

// Recursively filter out empty values from search criteria
export const filterEmptyValues = <T>(obj: T): T => {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj === 'string') {
    return obj === '' ? undefined as any : obj;
  }

  if (Array.isArray(obj)) {
    const filtered = obj.map(filterEmptyValues).filter(item => item !== undefined);
    return filtered.length === 0 ? undefined as any : filtered as any;
  }

  if (typeof obj === 'object') {
    const filtered: any = {};
    let hasNonEmptyValues = false;

    for (const [key, value] of Object.entries(obj)) {
      const filteredValue = filterEmptyValues(value);
      if (filteredValue !== undefined) {
        filtered[key] = filteredValue;
        hasNonEmptyValues = true;
      }
    }

    return hasNonEmptyValues ? filtered : undefined as any;
  }

  return obj;
};
