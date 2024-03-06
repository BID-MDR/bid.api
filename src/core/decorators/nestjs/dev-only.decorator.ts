import { applyDecorators, UseGuards, SetMetadata } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { DevOnlyGuard } from 'src/core/guards/dev-only.guard';

export const DEV_ONLY_ROUTE_DECORATOR_KEY = 'decorator:dev-only-route';

export const DevOnlyRoute = (): ClassDecorator & MethodDecorator =>
    applyDecorators(
        UseGuards(DevOnlyGuard),
        SetMetadata(DEV_ONLY_ROUTE_DECORATOR_KEY, true),
        ApiExcludeEndpoint(process.env.NODE_ENV === 'production'),
    );
