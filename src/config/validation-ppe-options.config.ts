// src/config/validation-ppe-options.config.ts

import {  BadRequestException, ValidationPipeOptions } from "@nestjs/common";
import { ErrorCodes } from "src/common/constants/error-codes.enum";
import { BaseException } from "src/common/exceptions/base.exception";



export const CustomValidationPipeOptions: ValidationPipeOptions = {
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
    exceptionFactory: (errors) => {
        const formattedErrors = errors.reduce((acc, err) => {
            acc[err.property] = err.constraints ? Object.values(err.constraints) : (err?.children ? err.children.reduce((acc, child)=> {
                acc[child.property] = child?.constraints

                return acc
            }, {}): null);
            return acc;
        }, {})

        throw new BaseException('Validation failed', ErrorCodes.VALIDATION_ERROR, 400, formattedErrors)
    }
}
