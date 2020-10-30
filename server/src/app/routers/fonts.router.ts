
import express, { Request, Response, Router } from 'express';
import pgPromise from 'pg-promise';
import { BaseRouter } from './base.router';
import { DbFont } from '../models/font.model';
import { RouterCallback } from '../models/router.model';
import { routes } from '../routes';
import { sqlQueries } from '../sql-queries';
const pgp = pgPromise({});

export class FontsRouter extends BaseRouter {

  constructor(routerCallback: RouterCallback<DbFont>) {
    const baseRoute = routes.api.font._root;
    const baseQuery = sqlQueries.selectFontsTable;
    super(baseRoute, baseQuery, routerCallback);

    // handle adding a new font (moving from Available to Selectable or Blacklisted)
    let route = baseRoute + routes.api.font.add;
    this.router.post(route, (req: Request, res: Response) => {
      const newFont = [req.body as DbFont];

      const fontColumnSet = new pgp.helpers.ColumnSet(newFont[0], { table: 'font' });
      const query = pgp.helpers.insert(newFont[0], fontColumnSet);

      console.log('fontsRouter ADD: ' + JSON.stringify(newFont, null, 4));
      console.log('Modified query: ' + query.toString() + '\n\n');

      routerCallback(route, query, res);
    });

    // handle removing a font (moving from Selectable or Blacklisted to Available)
    route = routes.api.font._root + routes.api.font.remove;
    this.router.post(route, (req: Request, res: Response) => {
      const removeFontId = [req.body.id];
      console.log('fontsRouter REMOVE: ' + removeFontId);
      routerCallback(route, sqlQueries.removeFont, res, removeFontId);
    });

  }
}