import { Module } from '@nestjs/common';
import { CrudService } from './crud.service';
import { CrudController } from './crud.controller';

@Module({
  providers: [CrudService],
  controllers: [CrudController],
})
export class CrudModule {}
