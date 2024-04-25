import { Module } from '@nestjs/common';
import { Modules } from './modules/modules.module';

@Module({
  imports: [Modules],
})
export class AppModule { }
