import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { IResponse } from 'src/Interfaces';
import { Ticket } from './entities/ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async create(createTicketDto: CreateTicketDto): Promise<IResponse<any>> {
    try {
      const ticket = new Ticket()
      ticket.titulo = createTicketDto.titulo;
      ticket.estado = createTicketDto.estado;
      ticket.tipoTicket = createTicketDto.tipoTicket;
      ticket.creadoPorId = createTicketDto.creadoPorId;
      ticket.prioridad = createTicketDto.prioridad;
      ticket.asignadoAId = createTicketDto.asignadoAId ?? null;
      ticket.descripcion = createTicketDto.descripcion;
      ticket.tipo = createTicketDto.tipo;
      ticket.tiempoEstimado = createTicketDto.tiempoEstimado;
      await this.ticketRepository.save(ticket);
      return {
        code: '000',
        message: 'Se creo con exito!',
        data: null
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async findAll(): Promise<IResponse<any>> {
    try {
      const ticketData = await this.ticketRepository.find()
      const user = await this.usersRepository.find({
        select: ['IdUser', 'Name', 'Rol', 'Active'],
        where: {
          Active: 'Y'
        }
      })

      const usersMap = new Map<string, any>(
        user.map((u) => [u.IdUser.toString(), u])
      );

      const result = ticketData.map((item) => {
        const creadoPor = usersMap.get(item.creadoPorId?.toString());
        const asignadoA = item.asignadoAId
          ? usersMap.get(item.asignadoAId.toString())
          : null;
        return {
          ...item,
          creadoPor,
          asignadoA,
        };
      })

      return {
        code: '000',
        message: 'ok',
        data: result
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async findOne(id: number) {
    try {
       const ticketData = await this.ticketRepository.findOne({
        where:{idTicket:id}
      })

      const asignadoA = await this.usersRepository.findOne({
        where: {
          IdUser: Number(ticketData?.asignadoAId)
        },
        select: ['IdUser', 'Name', 'Rol', 'Active']
      });

      console.log("asignadoA",asignadoA)

      const creadoPor = await this.usersRepository.findOne({
        where: {
          IdUser: Number(ticketData?.creadoPorId)
        },
        select: ['IdUser', 'Name', 'Rol', 'Active']
      });

       return {
        code: '000',
        message: 'ok',
        data: {
          ...ticketData,
          creadoPor,
          asignadoA
        }
      }

    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async update(id: any, updateTicketDto: UpdateTicketDto): Promise<IResponse<any>> {
  try {

    const ticket = await this.ticketRepository.findOne({
      where: { idTicket:id }, 
    });

    if (!ticket) {
      throw new NotFoundException('No existe el ticket');
    }
    
    Object.assign(ticket, updateTicketDto);
    const updatedTicket = await this.ticketRepository.save(ticket);

    return {
      code: '000',
      message: 'Se actualizó con éxito!',
      data: updatedTicket,
    };
  } catch (error) {
    if (error instanceof NotFoundException) {
      throw error;
    }
    throw new InternalServerErrorException(error?.message || 'Error interno del servidor');
  }
}


  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
