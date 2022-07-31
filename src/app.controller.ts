import {
  Controller,
  Get,
  Param,
  Query,
  Render,
  Req,
  Res,
} from '@nestjs/common';
import configurations from 'condfig/configurations';
import { URLSearchParams } from 'url';
import { AppService } from './app.service';
import url from 'url';
import axios from 'axios';
import { encodeQueryData } from './helpers/encodeQueryData';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root() {}

  @Get('/api')
  async getWeather(@Query() query, @Res() res) {
    try {
      const { api } = configurations();

      const queryString = encodeQueryData(query);

      const apiResponse = await axios.get(
        `${api.baseName}?${queryString}&${api.key}=${api.value}`,
      );

      const data = apiResponse.data;

      res.json(data);
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }
}
