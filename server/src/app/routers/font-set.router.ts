
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
    const baseQuery = sqlQueries.getFontSetsApis;
    super(baseRoute, baseQuery, routerCallback);

    // handle updating a fontSet
    let route = baseRoute + routes.api.font.fontSet.update;
    this.router.post(route, (req: Request, res: Response) => {
      const newFontSet = req.body as DbFontSet[];

      const fontSetColumnSet = new pgp.helpers.ColumnSet(
        [
          'set_id', 'set_name', 'fk_font_type_id', 'fk_font_instance_id'
        ], 
        { table: 'font_set' }
      );
      const onefont = newFontSet[0];
      let query = pgp.helpers.update(newFontSet, fontSetColumnSet);
      query += ' WHERE v.set_id = t.set_id AND v.fk_font_type_id = t.fk_font_type_id';

      // TODO: loop through newFontSet array and construct a compound update query
      // - start with 5 separate queries? use BEGIN ... COMMIT ?

      console.log('fontSetRouter UPDATE: ' + JSON.stringify(newFontSet, null, 4));
      console.log('Modified query: ' + query.toString() + '\n\n');

      routerCallback(route, query, res);
    });

    route = baseRoute + routes.api.font.fontSet.add;
    this.router.post(route, (req: Request, res: Response) => {
      const newFontSet = req.body as DbFontSet[];

      const fontSetColumnSet = new pgp.helpers.ColumnSet(
        [
          'set_id', 'set_name', 'fk_font_type_id', 'fk_font_instance_id'
        ], 
        { table: 'font_set' }
      );
      const query = pgp.helpers.insert(newFontSet, fontSetColumnSet);

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