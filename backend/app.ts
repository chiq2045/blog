import Koa from 'koa';
import logger from 'koa-logger';
import Lokijs from 'lokijs';
import koaBody from 'koa-body';
import { userRouter } from './apps/users';
import { exceptionHandler } from './middleware/exception-handler.middleware';
import { SINGLETON as UserDAO } from './apps/users/user.controller';
import {authRouter} from './apps/auth';

const app = new Koa();

const DB = new Lokijs('blog.json', {
  autosave: true
});

UserDAO.configure(DB);

app.use(logger());
app.use(exceptionHandler);
app.use(koaBody());

app.use(userRouter.routes());
app.use(userRouter.allowedMethods());
app.use(authRouter.routes());
app.use(authRouter.allowedMethods());

export { app };
