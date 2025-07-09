// src/modules/audit_trail/services/audit-trail-archive.service.ts

import { Inject, Injectable, Logger } from '@nestjs/common';
import { BaseService } from 'src/common/base/services/base.service';
import { AuditTrailEntity } from '../entities/audit-trail.entity';
import { IAuditTrailArchiveRepository } from '../interfaces/audit-trail-archive-repository.interface';
import { IAuditTrailArchiveService } from '../interfaces/audit-trail-archive-service.interface copy';

@Injectable()
export class AuditTrailArchiveService
  extends BaseService<AuditTrailEntity>
  implements IAuditTrailArchiveService
{
  constructor(
    @Inject('IAuditTrailArchiveRepository')
    protected readonly repository: IAuditTrailArchiveRepository,
    protected logger: Logger,
  ) {
    super(repository, logger);
  }
}
