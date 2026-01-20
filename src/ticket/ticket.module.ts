import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { User } from '../auth/entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    Ticket,
    User
  ])],
  controllers: [TicketController],
  providers: [TicketService],
})
export class TicketModule {}
