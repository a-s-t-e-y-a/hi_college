import { ExecutionContext, createParamDecorator } from '@nestjs/common';
export interface UserToken {
  userId: string;
  email: string;
  iat: number; // Issued at time (Unix timestamp)
  exp: number; // Expiration time (Unix timestamp)
}

export const Tenant = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
