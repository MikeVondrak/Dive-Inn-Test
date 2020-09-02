// https://dev.to/aligoren/developing-an-express-application-using-typescript-3b1

import express, { Application, Request, Response, NextFunction, RequestHandler, Router } from 'express';
import mysql, { ConnectionConfig, Connection, QueryOptions, MysqlError, FieldInfo, queryCallback, Pool, PoolConfig } from 'mysql';
import { routes } from './routes';
import { Observable, Observer } from 'rxjs';

export class ServerApp {
  private app: Application;
  private pool: Pool;
  private readonly dbConfig: ConnectionConfig = {
    host: 'localhost',
    port: 3306,
    user: 'DiveMaster',
    password: 'D1v3M4st3r!!',
    database: 'dive_inn_test_db',
  };
  private readonly herokuDbConfig: ConnectionConfig = {
    host: 'ec2-34-195-115-225.compute-1.amazonaws.com',
    port: 5432,
    user: 'gjdceezcnugnyv',
    password: '01830a0a446a61701aee908b0c6443262b943703339bd17bc7a6823f70cddc11',
    database: 'd125dfl39tajfu'
  }

  constructor(
    private angularAppLocation: string = '',
    private port: string = '3000',
    private staticPathList: string[],
    private middleWareList: RequestHandler[],
    private controllerList: Router[]
  ) {
    this.app = express(); // create a new express application instance
    this.port = process.env.PORT ? process.env.PORT : this.port; // process.env.PORT set by Heroku
    

    if (process.env.NODE_ENV === 'production') {
      console.log('DB connection:\t\tHEROKU');
      this.pool = this.createPool(this.herokuDbConfig);
    } else {
      console.log('DB connection:\t\tLOCAL');
      this.pool = this.createPool(this.dbConfig);
    }
    

    // first to match route takes precedence,  static > middleware > controllers
    // '/' defaults to index.html from Express settings
    this.useStatic(this.staticPathList);
    this.useMiddleware(this.middleWareList);
    this.useControllers(this.controllerList);
    this.setCatchAllRoutes();
  }

  /**
   * Load app with paths from which to serve static files
   * @param paths array of paths to static file locations
   *  NOTE: express.static makes the files in the path passed in accessible from the root URL (e.g. localhost:3000/<file name>)
   *  Since we load the static paths first, calls to the root path (localhost:3000/) will end up loading /dist/dive-inn/index.html
   *  Can add a mount point to serve from a different path (e.g. '/static', doesn't have to exist) but causes problems w/Angular,
   *    may need to build with --base-href flag and/or set base href in index.html
   */
  private useStatic(paths: string[]) {
    paths.forEach(path => {
      this.app.use(express.static(path));
      // this.app.use('/static', express.static(path)); // specify a mount path
    });
  }

  /**
   * Load middleware for processing requests
   * @param requestHandlers array of middleware RequestHandlers
   */
  private useMiddleware(requestHandlers: RequestHandler[]) {
    requestHandlers.forEach(requestHandler => {
      this.app.use(requestHandler);
    });
  }

  /**
   * Load controllers to handle API routes
   * @param routers array of Routers
   */
  private useControllers(routers: Router[]) {
    routers.forEach(router => {
      // this.app.use(routes.api.root, router);
      this.app.use(routes.api._root, router);
    });
  }

  /**
   * Catch all unhandled routes
   * @TODO proper 404 etc error handling
   */
  private setCatchAllRoutes() {
    this.app.all(routes.error._404, (req, res) => {
      // res.status(200).sendFile('/', {root: angularAppLocation});
      res.status(404).send('Route Not Found');
    });
  }

  /**
   * Start Express app
   */
  public beginListening() {
    this.app.listen(this.port, () => {
      console.log('********************************************************************************');
      console.log('Node Express server for "' + this.app.name + '" listening on port: ' + this.port + '\n');
    });
  }

  private createPool(dbConfig: ConnectionConfig, poolSize: number = 20): Pool {
    const poolConfig: PoolConfig = {
      connectionLimit: poolSize,
      ...dbConfig
    };
    return mysql.createPool(poolConfig);
  }

  /**
   * Query using pool, automatically aquires and releases connection to db
   * @template T Type of Observable to return
   * @param sqlQuery SQL query string
   * @returns Observable of array of provided type, containing query results
   */
  public poolQuery<T>(sqlQuery: string, values?: any[]): Observable<T[]> {

    const queryResult$ = (observer: Observer<T[]>) => {

      const queryOptions: QueryOptions = {
        sql: sqlQuery,
      };

      const responseCallback: queryCallback = (err: MysqlError | null, rows: T[], fields: FieldInfo[] | undefined) => {
        if (err) {
          observer.error(err);
        }
        observer.next(rows);
        observer.complete();
      };

      if (values) {
        this.pool.query(queryOptions, values, responseCallback);
      } else {
        this.pool.query(queryOptions, responseCallback);
      }
    };

    return new Observable<T[]>(queryResult$);
  }


  // Not sure we need to explicitly disconnet or do any cleanup?
  // Theoretically Node/Express "should never stop running"
  // can attach an event handler to process.on('exit', () => {})
  public disconnectDb(connection: Connection) {
    connection.end();
  }
  
}
