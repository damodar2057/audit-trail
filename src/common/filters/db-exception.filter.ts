// src/common/filters/database-exception.filter.ts

import { ArgumentsHost, Catch, ExceptionFilter, Inject } from "@nestjs/common";
import { TypeORMError } from "typeorm";
import { IDatabaseErrorHandler } from "../base/interfaces/db-error-handler.interface";

@Catch(TypeORMError)
export class DatabaseExceptionFilter implements ExceptionFilter {
    constructor(
        @Inject('IDatabaseErrorHandler')
        private readonly databaseErrorHandler: IDatabaseErrorHandler
    ) {}

    catch(exception: TypeORMError, host: ArgumentsHost) {
        // Convert TypeORM error to DatabaseException
        const databaseException = this.databaseErrorHandler.handleError(exception);
        
        // Let the exception bubble up to the global filter
        throw databaseException;
    }
}
