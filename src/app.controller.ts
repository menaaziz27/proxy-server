import { Controller, Get, Query, Render, Res } from '@nestjs/common';
import configurations from 'config/configurations';
import axios from 'axios';
import { encodeQueryData } from './helpers/encodeQueryData';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  root() {
    return;
  }

  @Get('/api')
  async getWeather(@Query() query, @Res() res) {
    try {
      const { api } = configurations();

      const api_credentials = {};

      api_credentials[api.key] = api.value;

      const queryString = encodeQueryData({ ...query, ...api_credentials });

      const apiResponse = await axios.get(`${api.baseName}?${queryString}`);

      const data = apiResponse.data;

      res.json(data);
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}
