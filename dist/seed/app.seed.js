"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const seed_service_1 = require("./seed.service");
const app_module_1 = require("../app.module");
async function runSeed() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const seedService = app.get(seed_service_1.SeedService);
    try {
        await seedService.seedUser();
        console.log('User seeded successfully!');
    }
    catch (error) {
        console.error('Error seeding user:', error);
    }
    finally {
        await app.close();
    }
}
runSeed();
//# sourceMappingURL=app.seed.js.map