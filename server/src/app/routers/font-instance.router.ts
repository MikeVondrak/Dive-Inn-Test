
import express, { Request, Response, Router } from 'express';
import pgPromise from 'pg-promise';
import { BaseRouter } from './base.router';
import { DbFont, DbFontInstance } from '../models/font.model';
import { RouterCallback } from '../models/router.model';
import { routes } from '../routes';
import { sqlQueries } from '../sql-queries';
const pgp = pgPromise({});

export class FontInstanceRouter extends BaseRouter {

  constructor(routerCallback: RouterCallback<DbFontInstance>) {
    const baseRoute = routes.api.font._root + routes.api.font.instance._root;
    const baseQuery = sqlQueries.getFontInstanceApis;
    super(baseRoute, baseQuery, routerCallback); // base class handles 'get-all' instances

    // get FontInstance by ID
    let route = baseRoute + routes.api.font.instance._routeParam.id;
    this.router.get(route, (req: Request, res: Response) => {
      
      // create query w/req.params.id as SQL query param
      const query = sqlQueries.getFontInstanceById;
      const fontSetId = [req.params.id];

      console.log('fontInstanceRouter GET by ID: ' + fontSetId);
      console.log('query: ' + query.toString() + '\n\n');

      routerCallback(route, query, res, fontSetId);
    });
    
    // handle adding a new font instance
    route = baseRoute + routes.api.font.instance.add;
    this.router.post(route, (req: Request, res: Response) => {
      const newFont = req.body as DbFontInstance;
      const fontInstanceColumnSet = new pgp.helpers.ColumnSet(newFont, { table: 'font_instance' });
      const query = pgp.helpers.insert(newFont, fontInstanceColumnSet) + " " + sqlQueries.addFontInstanceReturning;
      
      console.log('fontInstanceRouter ADD: ' + JSON.stringify(newFont, null, 4));
      console.log('query: ' + query.toString() + '\n\n');

      routerCallback(route, query, res);
    });











    // NOTE: font instances are never removed in case they are reused in the future
  }
}