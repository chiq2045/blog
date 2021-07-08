import { ParameterizedContext } from 'koa';
import Router, { RouterParamContext } from '@koa/router';
import { Exception } from '../../common/exception';
import { SINGLETON as UserDAO } from './user.controller';
import {checkJwt} from '../../middleware/checkJwt.middleware';

export const userRouter = new Router({
  prefix: '/api/user'
});

userRouter.put(
  '/update',
  checkJwt,
  async (ctx: ParameterizedContext<any, RouterParamContext<any>, any>) => {
    const { email } = ctx.state.user;
    const { items } = ctx.request.body;
    const user = UserDAO.findByEmail(email);
    if (!email) {
      throw new Exception(400, 'E-mail not provided');
    }
    if (!user) {
      throw new Exception(400, 'User does not exist');
    }
    user.items = items;
    UserDAO.update(user);
    ctx.body = {};
  }
);
