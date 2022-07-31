import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import * as fs from 'fs';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: NextFunction) {
    const current_datetime = new Date();
    const formatted_date =
      current_datetime.getFullYear() +
      '-' +
      (current_datetime.getMonth() + 1) +
      '-' +
      current_datetime.getDate() +
      ' ' +
      current_datetime.getHours() +
      ':' +
      current_datetime.getMinutes() +
      ':' +
      current_datetime.getSeconds();
    const method = req.method;
    const url = req.url;
    const status = res.statusCode;
    const log = `[${formatted_date}] ${method}: ${url} ${status}`;
    console.log(log);

    fs.appendFile('logger.log', `${log}\n`, (err) => {
      if (err) console.log(err);
    });
    next();
  }
}
