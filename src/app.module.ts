import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShelterModule } from './shelter/shelter.module';

@Module({
  imports: [ShelterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
