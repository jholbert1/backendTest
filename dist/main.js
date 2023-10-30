"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        cors: true,
    });
    const logger = new common_1.Logger('Bootstrap');
    (0, app_module_1.configApp)(app);
    app.enableCors();
    app.useBodyParser('json', { limit: '20mb' });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Backend Developer Test')
        .setDescription('This is a API create for a Backend developer Test')
        .setVersion('1.0')
        .addTag('Backend Test')
        .addBearerAuth({
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
    })
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(process.env.PORT ? process.env.PORT : 3000);
    logger.log(`App running on port ${process.env.PORT}`);
    logger.log(`App running on http://localhost:${process.env.PORT}/api`);
}
bootstrap();
//# sourceMappingURL=main.js.map