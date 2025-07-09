//

import { BaseEntity } from "src/common/base/entities/base.entity";
import { DATABASE_TABLES } from "src/common/constants/db.enum";
import { Column, Entity } from "typeorm";

@Entity({name: DATABASE_TABLES.AUDIT_TRAIL_ARCHIVE})
export class AuditTrailArchiveEntity extends BaseEntity {
    
    @Column()
    appId: string;

    @Column()
    eventName: string;

    @Column()
    endPoint: string;

    @Column({type: 'simple-json'})
    request: Record<string, any>;

    @Column({type: 'simple-json'})
    response: Record<string, any>;

    @Column()
    userEmail: string;

    @Column()
    userPhone: string;

    @Column()
    userId: string;  // authentik user id

}