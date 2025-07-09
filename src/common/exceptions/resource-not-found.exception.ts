//

import { ErrorCodes } from "../constants/error-codes.enum";
import { BaseException } from "./base.exception";


export class NotFoundException extends BaseException {
    constructor(
        resource: string,
        id?: string | number,
        code: keyof typeof ErrorCodes = 'NOT_FOUND'
    ) {
        const message = id
            ? `${resource} with id ${id} not found`
            : `${resource} not found`;
        super(message, code, 404);
    }
}