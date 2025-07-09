// src/common/base/dtos/query.dto.ts
import { IsArray, IsInt, IsObject, IsOptional, IsString, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { IFilteringRule } from '../interfaces/filtering-rule.interface';


export class QueryDto {

    @IsOptional()
    @IsInt()
    @Min(1)
    @Transform(({ value })=> parseInt(value, 10))
    page?: number = 1;


    @IsOptional()
    @IsInt()
    @Min(1)
    @Transform(({ value })=> parseInt(value, 10))
    pageSize?: number= 10;


    @IsOptional()
    sortBy?: string = 'createdAt'


    @IsOptional()
    sortOrder?: 'ASC' | 'DESC' = 'DESC'

    @IsOptional()
    @IsArray()
    filters?: IFilteringRule[]
    
}