import Router, { RouterParamContext } from '@koa/router';
import { Serialize } from 'cerialize';
import { sign } from 'jsonwebtoken';
import { ParameterizedContext } from 'koa';
import { Exception } from '../../common/exception';
import { SINGLETON as UserDAO } from '../users/user.controller';

const { SECRET_OR_PRIVATE_KEY: secretOrPrivateKey } = process.env;

export const authRouter = new Router({
  prefix: '/api/auth'
});

authRouter
  .post(
    '/sign-in',
    async (
      ctx: ParameterizedContext<
        any,
        RouterParamContext<any, Record<string, unknown>>,
        any
      >
    ) => {
      const { body } = ctx.request;
      let user = UserDAO.findByEmail(body.email);
      if (user) {
        throw new Exception(401, 'E-mail already registered');
      }
      UserDAO.insertUser(body);
      user = UserDAO.findByEmail(body.email);
      ctx.body = {
        token: sign(user, secretOrPrivateKey),
        user: Serialize(user)
      };
    }
  )
  .post(
    '/sign-in',
    async (
      ctx: ParameterizedContext<
        any,
        RouterParamContext<any, Record<string, unknown>>,
        any
      >
    ) => {
      const { email, password } = ctx.request.body;
      const user = UserDAO.findByEmail(email);
      if (user && password === user.password) {
        ctx.body = {
          token: sign(user, secretOrPrivateKey),
          user: Serialize(user)
        };
      } else {
        throw new Exception(401, 'Unknown user');
      }
    }
  );
