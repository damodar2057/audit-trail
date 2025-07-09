// src/app.module.ts

import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeormConfig } from './config/postgres.config';
import Config from './config';
import { ServeStaticModule } from '@nestjs/serve-static';
import serveStaticOptions from './config/server-static.config';
import { validate } from './common/validation/env.validation';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { DatabaseExceptionFilter } from './common/filters/db-exception.filter';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { HttpCacheInterceptor } from './common/interceptors/cache.interceptor';
import { RedisCacheModule } from './modules/cache/cache.module';
import { AuditTrailModule } from './modules/audit_trail/audit-trail.module';
import { DatabaseErrorHandler } from './utils/db-error-handler.util';
import { ErrorMessageUtil } from './utils/error-message.util';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ScheduleModule } from '@nestjs/schedule';
import { ArchiveAuditLogsSchedular } from './common/jobs/archive-audit-logs.schedular';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: Config,
      validate: validate,
      cache: true
    }),
    ScheduleModule.forRoot(),
    
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ...(await typeormConfig(configService)),
        autoLoadEntities: true // this will auto load all entities defined in TypeOrmModule.forFeature([]) in respective module without specifying file path in datasource options
      })
    }),
    ServeStaticModule.forRoot(...serveStaticOptions),
    RedisCacheModule,


    // Business Module
    AuditTrailModule,
    
  ],
  controllers: [],
  providers: [
    Logger,
    {
      provide: APP_FILTER,
      useClass: DatabaseExceptionFilter // placing it here rather than on main.ts dependency injection will be automatic
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpCacheInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    },
    {
      provide: 'IDatabaseErrorHandler',
      useClass: DatabaseErrorHandler
    }, 
    
    ErrorMessageUtil,
    ArchiveAuditLogsSchedular
    
  ],
})
export class AppModule {}
