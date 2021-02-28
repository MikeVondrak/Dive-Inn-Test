
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

    /**
     * Update a font set
     */
    const updateRoute = baseRoute + routes.api.font.fontSet.update;
    this.router.post(updateRoute, (req: Request, res: Response) => {
      const newFontSet = req.body as DbFontSet[];

      const fontSetColumnSet = new pgp.helpers.ColumnSet(
        [
          'set_id', 'set_name', 'fk_font_type_id', 'fk_font_instance_id'
        ], 
        { table: 'font_set' }
      );
      const onefont = newFontSet[0];
      let query: string = pgp.helpers.update(newFontSet, fontSetColumnSet);

      let index = query.indexOf('v."set_id"');
      query = query.substring(0, index) + 
        '(' + query.substring(index, index + 10) + 
        ')::uuid' + query.substring(index + 10);
      // console.log(query.substring(0, index));
      // console.log(query.substring(index, index + 10));
      // console.log(query.substring(index + 10));
      // console.log('\n\n\n$%$%$%$%$$%\n', nquery, '\n\n');


      query += ' WHERE (v.set_id)::uuid = t.set_id AND v.fk_font_type_id = t.fk_font_type_id';
      query += ' ' + sqlQueries.updateFontSetReturning;

      // TODO: loop through newFontSet array and construct a compound update query
      // - start with 5 separate queries? use BEGIN ... COMMIT ?

      console.log('fontSetRouter UPDATE: ' + JSON.stringify(newFontSet, null, 4));
      console.log('Modified query: ' + query.toString() + '\nroute: ' + updateRoute + '\n\n');

      routerCallback(updateRoute, query, res);
    });

    /**
     * Add a new font set
     */
    const addRoute = baseRoute + routes.api.font.fontSet.add;
    this.router.post(addRoute, (req: Request, res: Response) => {
      const newFontSet = req.body as DbFontSet[];

      const fontSetColumnSet = new pgp.helpers.ColumnSet(
        [
          'set_id', 'set_name', 'fk_font_type_id', 'fk_font_instance_id'
        ], 
        { table: 'font_set' }
      );
      const query = pgp.helpers.insert(newFontSet, fontSetColumnSet) + " " + sqlQueries.addFontSetReturning;

      console.log('fontSetRouter ADD: ' + JSON.stringify(newFontSet, null, 4));
      console.log('Modified query: ' + query.toString() + '\n\n');

      routerCallback(addRoute, query, res);
    });

    /**
     * Delete a font set
     */
    const deleteRoute = baseRoute + routes.api.font.fontSet.remove;
    this.router.post(deleteRoute, (req: Request, res: Response) => {
      const removeFontSetId = [req.body.fontSetId];
      console.log('fontSetRouter REMOVE: ' + removeFontSetId);
      routerCallback(deleteRoute, sqlQueries.removeFontSet, res, removeFontSetId);
    });

  }
}