import jwtAuthz from '@tadashi/koa-jwt-authz';

export const checkScopes = (scopes: Array<string>) => jwtAuthz(scopes);
