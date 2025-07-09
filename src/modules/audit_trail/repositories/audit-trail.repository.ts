// src/modules/audit_trail/repositories/audit-trail.repository.ts

import { Injectable } from "@nestjs/common";
import { BaseRepository } from "src/common/base/repositories/base.repository";
import { Repository } from "typeorm";
import { CacheService } from "src/modules/cache/cache.service";
import { InjectRepository } from "@nestjs/typeorm";
import { AuditTrailEntity } from "../entities/audit-trail.entity";
import { IAuditTrailRepository } from "../interfaces/audit-trail-repository.interface";


@Injectable()
export class AuditTrailRepository extends BaseRepository<AuditTrailEntity> implements IAuditTrailRepository {
    constructor(
        @InjectRepository(AuditTrailEntity)
        protected readonly repository: Repository<AuditTrailEntity>,
        private readonly cache: CacheService
    ) {
        super(repository)
    }

}