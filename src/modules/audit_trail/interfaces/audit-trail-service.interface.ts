// src/modules/audit_trail/interfaces/audit-trail-service.interface.ts

import { IBaseService } from "src/common/base/interfaces/base-service.interface";
import { AuditTrailEntity } from "../entities/audit-trail.entity";


export interface IAuditTrailService extends IBaseService<AuditTrailEntity> {}