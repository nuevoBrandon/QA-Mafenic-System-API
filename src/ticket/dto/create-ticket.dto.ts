import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsNumberString,
  MaxLength,
  IsInt,
  Min,
  IsBoolean,
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

  @IsOptional()
  @IsInt()
  @Min(1)
  tiempoEstimado?: number;

  @IsOptional()
  @Type(() => Boolean) 
  @IsBoolean()
  activo?: boolean;
}
