// src/modules/audit_trail/controllers/audit-trail.controller.ts

import {
  Controller,
  Get,
  Inject,
  Logger,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { QueryDto } from 'src/common/base/dtos/query.dto';
import { FindOptionsWhere } from 'typeorm';
import { PaginationResponse } from 'src/common/decorators/pagination-response.decorator';
import { TypeOrmFilterHelper } from 'src/common/helpers/typeorm-filter.helper';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateDemoDto } from '../dtos/demo.dto';
import { IAuditTrailService } from '../interfaces/audit-trail-service.interface';
import { AuditTrailEntity } from '../entities/audit-trail.entity';

@ApiTags('Audit Trail')
@Controller('audit-trail')
export class AuditTrailController {
  private logger = new Logger(AuditTrailController.name);
  constructor(
    @Inject('IAuditTrailService')
    private readonly auditTrailService: IAuditTrailService,

    private readonly filterHelper: TypeOrmFilterHelper,
  ) {}

   /** Get audit trail even if they are in archive also, mind that
   * while fetching the data
   */
  @Get(':id')
  async get(@Req() request): Promise<void> {
    try {
    } catch (error) {
      throw error;
    }
  }


  /** Get audit trail even if they are in archive also, mind that
   * while fetching the data
   */
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, type: Number, example: 10 })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    type: String,
    example: 'createdAt',
  })
  @ApiQuery({
    name: 'sortOrder',
    required: false,
    enum: ['ASC', 'DESC'],
    example: 'DESC',
  })
  @Get()
  @PaginationResponse()
  async getAll(
    @Req() request,
    @Query() query: QueryDto,
  ): Promise<{ data: AuditTrailEntity[]; total: number }> {
    try {
      let options: FindOptionsWhere<AuditTrailEntity> = {};

      return await this.auditTrailService.findAndCount({
        skip: (query?.page - 1) * query.pageSize,
        take: query?.pageSize,
        order: {
          [query?.sortBy]: query?.sortOrder,
        },
        relations: {},
        where: {
          ...this.filterHelper.buildWhereConditions(query?.filters),
          ...options,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  @ApiBody({ type: CreateDemoDto })
  @Post()
  async create(@Req() request): Promise<void> {
    try {
    } catch (error) {
      throw error;
    }
  }


}
