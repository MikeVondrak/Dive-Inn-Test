import express, { RequestHandler, Request, Response } from 'express';
import path from 'path';
import compression from 'compression';

import { of } from 'rxjs';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

import mysql, { ConnectionConfig, Connection, QueryOptions, MysqlError, FieldInfo, queryCallback, Pool, PoolConfig } from 'mysql';

/** @TODO need to setup Heroku mysql connection */
// const dbConfig: ConnectionConfig = {
//   host: 'localhost',
//   port: 3306,
//   user: 'DiveMaster',
//   password: 'D1v3M4st3r!!',
//   database: 'dive_inn_test_db',
// }
// const testSql = mysql.createConnection(dbConfig);
// testSql.end();

const testRxjs: Observable<boolean> = of(false);
testRxjs.pipe(take(1)).subscribe(val => console.log('************* obsevables work'));


const app = express()
const port: string | number = process.env.PORT || 5000;

// running server app from ./server/app or ./server/dist (for prod)
const angular_app_location = '../../../dist/client'; // output from ng build --prod
const angular_dist_location = path.join(__dirname, angular_app_location);

const angular_assets_location = '../../src/assets'; /** @TODO more consistent locations / file structure */

app.use(compression()); // gzip for smaller file size / better performance
app.use(express.json());

app.use(express.static(angular_dist_location));

const angularAppResponse: RequestHandler = (req: Request, res: Response) => {
  console.log('NODE: Router default 200 response\n' + angular_app_location);
  // serve default file (index.html) for Angular app
  res.status(200).sendFile('/', {root: angular_app_location});
  //res.send('{ "test_id": 200 }');
};

app.use("*", angularAppResponse);

//create a server object:
app.listen(port, () => console.log(`hosting @${port}`));
