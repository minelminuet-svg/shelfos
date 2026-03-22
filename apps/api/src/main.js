"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const initialize_1 = require("./utils/initialize");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = process.env.PORT || 3001;
    // Initialize demo organization
    await (0, initialize_1.initializeDemo)();
    app.enableCors({
        origin: '*',
        credentials: true,
    });
    app.setGlobalPrefix('');
    await app.listen(port);
    console.log(`🚀 API Server running on http://localhost:${port}`);
}
bootstrap();
