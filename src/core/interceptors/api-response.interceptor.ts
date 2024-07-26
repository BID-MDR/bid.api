import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { Observable, map } from 'rxjs';
import { ResponseDto } from '../dtos/response.dto';

type Response<T> = {
  success: boolean;
  data: T;
  errors: any;
};

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    if (context.getType() === 'http') {
      return next
        .handle()
        .pipe(map((data) => {
            if(data instanceof ResponseDto){
                return data
            }
            return new ResponseDto<T>(true, data, null);
        }));
    }
    return next.handle();
  }
}