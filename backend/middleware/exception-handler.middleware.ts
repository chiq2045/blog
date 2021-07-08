import { Context, Next } from 'koa';
import { Exception } from '../common/exception';

export const exceptionHandler = async (ctx: Context, next: Next) => {
  try {
    return next();
  } catch (err) {
    if (err instanceof Exception) {
      ctx.body = err.toObject();
      ctx.status = err.statusCode;
    } else {
      ctx.body = { message: 'Unexpected error' };
      ctx.status = 500;
    }
  }
};
