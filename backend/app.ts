import Koa, { Context } from 'koa';
import Router from '@koa/router';
import logger from 'koa-logger';
import { exceptionHandler } from './apps/middleware/exception-handler.middleware';

const app = new Koa();
const router = new Router();

router.get('/', async (ctx: Context) => {
  ctx.body = 'OK';
  ctx.status = 200;
})

app.use(logger())
app.use(exceptionHandler);

app.use(router.routes());
app.use(router.allowedMethods());

export { app };
