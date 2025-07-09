// src/config/server-static.config.ts

import { ServeStaticModuleOptions } from "@nestjs/serve-static";
import { join } from "path";

const serveStaticOptions: ServeStaticModuleOptions[] = [
    {
        rootPath: join(__dirname, '..', '..', '..', '/uploads/'),
        serveRoot: '/uploads'
    }
]

export default serveStaticOptions;