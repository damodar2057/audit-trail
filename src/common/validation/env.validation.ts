// src/common/validation/env.validation.ts

import { plainToInstance } from "class-transformer";
import { IsEnum, IsNumber, IsString, Max, Min, validateSync } from "class-validator";


enum Environment {
    Development = 'development',
    Production = 'production',
    Test = 'test',
}

class EnvironmentVariables {
    @IsEnum(Environment)
    NODE_ENV: Environment;

    @IsNumber()
    @Min(0)
    @Max(65535)
    PORT: number;

    @IsString()
    DATABASE_PASSWORD: string;
}


export function validate(config: Record<string, unknown>) {
    const validatedConfig = plainToInstance(
        EnvironmentVariables,
        config,
        { enableImplicitConversion: true}
    );
    const errors = validateSync(validatedConfig, { skipMissingProperties: false })
    if (errors.length > 0) {
        throw new Error(errors.toString())
    }

    return validatedConfig;
}