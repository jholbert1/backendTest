import { NestFactory } from '@nestjs/core';
import { SeedService } from './seed.service';
import { AppModule } from '../app.module';

async function runSeed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seedService = app.get(SeedService);

  try {
    await seedService.seedUser();
    console.log('User seeded successfully!');
  } catch (error) {
    console.error('Error seeding user:', error);
  } finally {
    await app.close();
  }
}

runSeed();
