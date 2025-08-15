import type { IDatabaseClientService } from '@sample/database/access/types/services/database-client.service.interface';
import { ModelNameWithoutViews, Views } from '@sample/database/access/types/prisma.types';
import { CreateManyParams, CreateOneParams, createPrismaOrderBy, DeleteOneParams, filterEmptyValues, RetrieveFirstFromViewParams, RetrieveFirstParams, RetrieveManyFromViewParams, RetrieveManyParams, RetrieveUniqueParams, UpdateManyParams, UpdateOneParams, UpsertManyParams, UpsertOneParams } from '@sample/database/access/types/arguments.types';
import { ModelName } from '@sample/database/access';


export abstract class BaseRepository {
  constructor(protected readonly databaseClientService: IDatabaseClientService) {}

  public convertRetrieveManyParams<T extends ModelName>(options: RetrieveManyParams<T> = {}) {
    return {
      where: options.searchCriteria ? filterEmptyValues(options.searchCriteria) : undefined,
      orderBy: createPrismaOrderBy(options.orderBy),
      skip: options.skip,
      take: options.take,
    };
  }

  public convertRetrieveManyFromViewParams<T extends Views>(options: RetrieveManyFromViewParams<T> = {}) {
    return {
      where: options.searchCriteria ? filterEmptyValues(options.searchCriteria) : undefined,
      skip: options.skip,
      take: options.take,
      orderBy: createPrismaOrderBy(options.orderBy),
    };
  }

  public convertRetrieveFirstFromViewParams<T extends Views>(options: RetrieveFirstFromViewParams<T> = {}) {
    return {
      where: options.searchCriteria ? filterEmptyValues(options.searchCriteria) : undefined,
      orderBy: createPrismaOrderBy(options.orderBy),
    };
  }

  public convertRetrieveFirstParams<T extends ModelName>(options: RetrieveFirstParams<T> = {}) {
    return {
      where: options.searchCriteria ? filterEmptyValues(options.searchCriteria) : undefined,
      orderBy: createPrismaOrderBy(options.orderBy),
    };
  }

  public convertRetrieveUniqueParams<T extends ModelNameWithoutViews>(
    options: RetrieveUniqueParams<T>,
  ) {
    return {
      where: filterEmptyValues(options.searchCriteria),
    };
  }

  public convertCreateManyParams<T extends ModelNameWithoutViews>(options: CreateManyParams<T>) {
    return {
      data: options.data,
    };
  }

  public convertCreateOneParams<T extends ModelNameWithoutViews>(options: CreateOneParams<T>) {
    return {
      data: options.data,
    };
  }

  public convertUpdateManyParams<T extends ModelNameWithoutViews>(options: UpdateManyParams<T>) {
    return {
      where: filterEmptyValues(options.searchCriteria),
      data: options.data,
    };
  }

  public convertUpsertOneParams<T extends ModelNameWithoutViews>(options: UpsertOneParams<T>) {
    return {
      where: filterEmptyValues(options.searchCriteria),
      create: options.create,
      update: options.update,
    };
  }

  public convertUpsertManyParams<T extends ModelNameWithoutViews>(options: UpsertManyParams<T>) {
    return options.data;
  }

  public convertUpdateOneParams<T extends ModelNameWithoutViews>(options: UpdateOneParams<T>) {
    return {
      where: filterEmptyValues(options.searchCriteria),
      data: options.data,
    };
  }

  public convertDeleteOneParams<T extends ModelNameWithoutViews>(options: DeleteOneParams<T>) {
    return {
      where: filterEmptyValues(options.searchCriteria),
    };
  }
}
