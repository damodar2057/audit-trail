// src/common/base/interfaces/error-handler.interface.ts

import { Logger } from "@nestjs/common";

export interface ICustomErrorHandler {

    /** handler error */
    handleError(logger: Logger, error: any, message: string): void;
}