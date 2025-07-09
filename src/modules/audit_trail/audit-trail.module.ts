// 

import { Logger, Module } from '@nestjs/common';
import { AuditTrailController } from './controllers/audit-trail.controller';
import { AuditTrailArchiveEntity } from './entities/audit-trail-archive.entity';
import { AuditTrailEntity } from './entities/audit-trail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditTrailRepository } from './repositories/audit-trail.repository';
import { AuditTrailArchiveService } from './services/audit-trail-archive.service';
import { AuditTrailService } from './services/audit-trail.service';
import { TypeOrmFilterHelper } from 'src/common/helpers/typeorm-filter.helper';
import { CacheService } from '../cache/cache.service';
import { AuditTrailArchiveRepository } from './repositories/audit-trail-archive.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AuditTrailArchiveEntity, AuditTrailEntity])],
  controllers: [AuditTrailController],
  providers: [
    {
      provide: 'IAuditTrailService',
      useClass: AuditTrailService,
    },
    {
      provide: 'IAuditTrailArchiveService',
      useClass: AuditTrailArchiveService,
    },
    {
      provide: 'IAuditTrailRepository',
      useClass: AuditTrailRepository,
    },
    {
      provide: 'IAuditTrailArchiveRepository',
      useClass: AuditTrailArchiveRepository,
    },
    Logger,
    CacheService,
    TypeOrmFilterHelper,
  ],
  exports: [
    {
      provide: 'IAuditTrailService',
      useClass: AuditTrailService,
    },
    TypeOrmFilterHelper,
  ],
})
export class AuditTrailModule { }
