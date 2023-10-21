"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        stopAtFirstError: true,
        transform: true,
    }));
    (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Сервис трекинга погрузчиков')
        .setDescription('Сервис для логирования перемещений погрузчиков')
        .build();
    const swaggerDocument = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('/documentation', app, swaggerDocument, {
        swaggerOptions: {
            supportedSubmitMethods: [],
        },
    });
    const PORT = process.env.APP_PORT || 3000;
    await app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map