import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TicketModule } from './ticket/ticket.module';


console.log('🔍 Variables de entorno:');
console.log('POSTGRES_HOST:', process.env.POSTGRES_HOST);
console.log('POSTGRES_USER:', process.env.POSTGRES_USER);
console.log('POSTGRES_PASSWORD:', process.env.POSTGRES_PASSWORD);
console.log('POSTGRES_DB:', process.env.POSTGRES_DB);
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD!,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    AuthModule,
    TicketModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
