import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { WinnersController } from './winners.controller';
import { WinnersService } from './winners.service';
import { Winner } from './entities/winner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Winner]), MulterModule.register()],
  controllers: [WinnersController],
  providers: [WinnersService],
  exports: [WinnersService],
})
export class WinnersModule {}
