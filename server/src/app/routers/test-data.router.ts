import { routes } from "../routes";
import { sqlQueries } from "../sql-queries";
import express, { Request, Response, Router } from 'express';
import { BaseRouter } from "./base.router";
import { RouterCallback } from "../models/router.model";
import { DbFont } from "../models/font.model";

interface TestData {
  id: number,
  test_char: string,
  test_null_char: string,
  test_varchar: string,
  test_text: string,
  test_int: number,
  test_sm_int: number,
  test_float: number,
  test_date: Date,
  test_time: Date,
  test_timestamp: Date,
  test_json: JSON
}

export class TestDataRouter extends BaseRouter {

  constructor(routerCallback: RouterCallback<TestData>) {
    super('', '', routerCallback);

    const testDataRouter = express.Router();
    testDataRouter.get(routes.api.test, (req: Request, res: Response) => {
      console.log('***** testDataRouter');
      routerCallback(routes.api.test, sqlQueries.selectTestTable, res);
    });
  }
}