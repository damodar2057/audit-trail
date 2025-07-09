// src/config/app.config.ts

import { registerAs } from "@nestjs/config";


export const AppConfig = registerAs('app', ()=> {
    return {
        app_env: process.env.NODE_ENV || 'development',
        port: Number(process.env.PORT),
        globalPrefix: process.env.PREFIX,
        webUrl: process.env.WEB_URL, // Load frontend Url from .env,
        jwtSecret: process.env.JWT_SECRET_KEY,
        allowedOrigins: process.env.ALLOWED_ORIGINS
    }
})