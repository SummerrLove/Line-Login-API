// import axios from 'axios';
import Koa from 'koa';
import Router from 'koa-router';
import Cors from '@koa/cors';
import LineRouter from './routes';
import BodyParser from 'koa-bodyparser';
import dotenv from 'dotenv';

dotenv.config();
const koa = new Koa();

console.log(process.env.line_channel_id);
// const router = new Router();
// router.post('/test', async ctx => {
//     console.log(ctx.request.href);
//     ctx.body = ctx.request.query;
// });

koa.use(Cors());
koa.use(BodyParser());
// router.use(LineRouter.routes());
// router.use(LineRouter.allowedMethods());
// koa.use(router.routes());
koa.use(LineRouter.routes());
koa.use(LineRouter.allowedMethods());
koa.listen(process.env.PORT || 3066);
console.log("Start listening on port 3066 (or designated port on heroku)");