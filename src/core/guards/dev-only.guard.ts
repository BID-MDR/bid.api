import { Injectable, CanActivate, ExecutionContext, NotFoundException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DEV_ONLY_ROUTE_DECORATOR_KEY } from '../decorators/nestjs/dev-only.decorator';

@Injectable()
export class DevOnlyGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const isDevOnlyRoute = this.reflector.get<boolean>(DEV_ONLY_ROUTE_DECORATOR_KEY, context.getHandler());

        if (isDevOnlyRoute && process.env.NODE_ENV === 'production') throw new NotFoundException();

        return true;
    }
}
