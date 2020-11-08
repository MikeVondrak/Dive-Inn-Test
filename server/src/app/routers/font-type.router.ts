
import express, { Request, Response, Router } from 'express';
import pgPromise from 'pg-promise';
import { BaseRouter } from './base.router';
import { DbFontType } from '../models/font.model';
import { RouterCallback } from '../models/router.model';
import { routes } from '../routes';
import { sqlQueries } from '../sql-queries';

export class FontTypeRouter extends BaseRouter {

  constructor(routerCallback: RouterCallback<DbFontType>) {
    const baseRoute = routes.api.font._root + routes.api.font.type._root;
    const baseQuery = sqlQueries.getFontTypes;
    super(baseRoute, baseQuery, routerCallback);
  }
}