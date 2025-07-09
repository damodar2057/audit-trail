// src/modules/audit_trail/repositories/audit-trail-archive.repository.ts


import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/common/base/repositories/base.repository";
import { Repository } from "typeorm";
import { CacheService } from "src/modules/cache/cache.service";
import { InjectRepository } from "@nestjs/typeorm";
import { IAuditTrailArchiveRepository } from "../interfaces/audit-trail-archive-repository.interface";
import { AuditTrailArchiveEntity } from "../entities/audit-trail-archive.entity";


@Injectable()
export class AuditTrailArchiveRepository extends BaseRepository<AuditTrailArchiveEntity> implements IAuditTrailArchiveRepository {
    constructor(
        @InjectRepository(AuditTrailArchiveEntity)
        protected readonly repository: Repository<AuditTrailArchiveEntity>,
        private readonly cache: CacheService
    ) {
        super(repository)
    }

}