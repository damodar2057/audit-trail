// ssrc/modules/audit_trail/interfaces/audit-trail-archive-repository.interface.ts
import { BaseRepository } from "src/common/base/repositories/base.repository";
import { AuditTrailArchiveEntity } from "../entities/audit-trail-archive.entity";


export interface IAuditTrailArchiveRepository extends BaseRepository<AuditTrailArchiveEntity> {}