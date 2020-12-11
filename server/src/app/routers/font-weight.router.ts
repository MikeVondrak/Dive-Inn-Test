
import express, { Request, Response, Router } from 'express';
import pgPromise from 'pg-promise';
import { BaseRouter } from './base.router';
import { DbFontWeight } from '../models/font.model';
import { RouterCallback } from '../models/router.model';
import { routes } from '../routes';
import { sqlQueries } from '../sql-queries';

export class FontWeightRouter extends BaseRouter {

  constructor(routerCallback: RouterCallback<DbFontWeight>) {
    const baseRoute = routes.api.font._root + routes.api.font.weight._root;
    const baseQuery = sqlQueries.getFontWeights;
    super(baseRoute, baseQuery, routerCallback);
  }
}