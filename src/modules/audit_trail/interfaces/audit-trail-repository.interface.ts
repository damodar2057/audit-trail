// src/modules/audit_trail/interfaces/audit-trail-repository.interface.ts

import { BaseRepository } from "src/common/base/repositories/base.repository";
import { AuditTrailEntity } from "../entities/audit-trail.entity";


export interface IAuditTrailRepository extends BaseRepository<AuditTrailEntity> {}