// src/modules/audit_trail/services/audit-trail.service.ts

import { Inject, Injectable, Logger } from '@nestjs/common';
import { BaseService } from 'src/common/base/services/base.service';
import { AuditTrailEntity } from '../entities/audit-trail.entity';
import { IAuditTrailRepository } from '../interfaces/audit-trail-repository.interface';
import { IAuditTrailService } from '../interfaces/audit-trail-service.interface';

@Injectable()
export class AuditTrailService
  extends BaseService<AuditTrailEntity>
  implements IAuditTrailService
{
  constructor(
    @Inject('IAuditTrailRepository')
    protected readonly repository: IAuditTrailRepository,
    protected logger: Logger,
  ) {
    super(repository, logger);
  }
}
