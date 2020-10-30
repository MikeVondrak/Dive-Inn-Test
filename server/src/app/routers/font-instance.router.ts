
import express, { Request, Response, Router } from 'express';
import pgPromise from 'pg-promise';
import { BaseRouter } from './base.router';
import { DbFont, DbFontInstance } from '../models/font.model';
import { RouterCallback } from '../models/router.model';
import { routes } from '../routes';
import { sqlQueries } from '../sql-queries';
const pgp = pgPromise({});

export class FontInstanceRouter extends BaseRouter {

  constructor(routerCallback: RouterCallback<DbFont>) {
    const baseRoute = routes.api.font._root + routes.api.font.instance._root;
    const baseQuery = sqlQueries.getFontInstances;
    super(baseRoute, baseQuery, routerCallback);

    // handle adding a new font instance
    let route = baseRoute + routes.api.font.instance.add;
    this.router.post(route, (req: Request, res: Response) => {
      const newFont = [req.body as DbFontInstance];

      // const fontColumnSet = new pgp.helpers.ColumnSet(newFont[0], { table: 'font' });
      // const query = pgp.helpers.insert(newFont[0], fontColumnSet);

      console.log('fontInstanceRouter ADD: ' + JSON.stringify(newFont, null, 4));
      // console.log('Modified query: ' + query.toString() + '\n\n');

      // routerCallback(route, query, res);
    });

    // font instances are never removed in case they are reused in the future
  }
}