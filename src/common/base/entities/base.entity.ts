// src/common/base/entities/base.entity.ts

import { CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;


    @UpdateDateColumn({type:'timestamp'})
    updatedAt: Date;

    @DeleteDateColumn({type:'timestamp'})
    deletedAt: Date;
}