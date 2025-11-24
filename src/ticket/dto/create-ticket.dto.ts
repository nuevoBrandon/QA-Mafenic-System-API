import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsNumberString,
  MaxLength,
} from 'class-validator';

export enum TipoTicket {
  INCIDENCIA = 'INCIDENCIA',
  REQUERIMIENTO = 'REQUERIMIENTO',
}

export enum Prioridad {
  BAJA = 'BAJA',
  MEDIA = 'MEDIA',
  ALTA = 'ALTA',
  CRITICA = 'CRITICA',
}

export class CreateTicketDto {
  @IsEnum(TipoTicket)
  tipoTicket: TipoTicket;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  titulo: string;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  estado: string;

  @IsEnum(Prioridad)
  prioridad: Prioridad;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  tipo: string; 

  @IsNumberString()
  @IsNotEmpty()
  creadoPorId: string;

  @IsOptional()
  @IsNumberString()
  asignadoAId?: string;
}
