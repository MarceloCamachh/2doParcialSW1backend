import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CanvasModule } from './canvas/canvas.module';
import { DesignModule } from './design/design.module';
import { PrismaModule } from 'prisma/prisma.module';
import { ImportsModule } from './imports/imports.module';
import { FileSystemStoredFile, NestjsFormDataModule } from 'nestjs-form-data';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    AuthModule,
    CanvasModule,
    DesignModule,
    PrismaModule,
    ImportsModule,
    NestjsFormDataModule.configAsync({
      useFactory: () => ({
        storage: FileSystemStoredFile,
        fileSystemStoragePath: '/tmp'
      }),
      isGlobal: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
