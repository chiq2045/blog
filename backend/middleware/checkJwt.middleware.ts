import JwksRsa from 'jwks-rsa';
import jwt from 'koa-jwt';

const { JWKS_URI: jwksUri, AUDIENCE: audience, ISSUER: issuer } = process.env;

export const checkJwt = jwt({
  secret: JwksRsa.koaJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri
  }),
  audience,
  issuer,
  algorithms: ['RS256']
});
