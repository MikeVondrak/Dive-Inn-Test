
import express, { Request, Response, Router } from 'express';
import pgPromise from 'pg-promise';
import { BaseRouter } from './base.router';
import { DbFontSet } from '../models/font.model';
import { RouterCallback } from '../models/router.model';
import { routes } from '../routes';
import { sqlQueries } from '../sql-queries';
const pgp = pgPromise({});

export class FontSetRouter extends BaseRouter {

  constructor(routerCallback: RouterCallback<DbFontSet>) {
    const baseRoute = routes.api.font._root + routes.api.font.fontSet._root;
    const baseQuery = sqlQueries.getFontSets;
    super(baseRoute, baseQuery, routerCallback);

    // handle adding a fontSet
    let route = baseRoute + routes.api.font.fontSet.add;
    this.router.post(route, (req: Request, res: Response) => {
      const newFontSet = [req.body as DbFontSet];

      const fontSetColumnSet = new pgp.helpers.ColumnSet(newFontSet[0], { table: 'font_set' });
      const query = pgp.helpers.insert(newFontSet[0], fontSetColumnSet);

      console.log('fontSetRouter ADD: ' + JSON.stringify(newFontSet, null, 4));
      console.log('Modified query: ' + query.toString() + '\n\n');

      routerCallback(route, query, res);
    });

    // handle removing a fontSet
    route = baseRoute + routes.api.font.fontSet.remove;
    this.router.post(route, (req: Request, res: Response) => {
      const removeFontSetId = [req.body.id];
      console.log('fontSetRouter REMOVE: ' + removeFontSetId);
      routerCallback(route, sqlQueries.removeFontSet, res, removeFontSetId);
    });

  }
}