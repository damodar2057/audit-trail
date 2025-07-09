// src/modules/audit_trail/interfaces/audit-trail-service.interface.ts

import { IBaseService } from "src/common/base/interfaces/base-service.interface";
import { AuditTrailArchiveEntity } from "../entities/audit-trail-archive.entity";


export interface IAuditTrailArchiveService extends IBaseService<AuditTrailArchiveEntity> {}