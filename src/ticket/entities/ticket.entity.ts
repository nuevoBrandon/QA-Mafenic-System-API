import { Expose } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Generated,
} from 'typeorm';

@Entity({ name: 'tickets' })
export class Ticket {
  @PrimaryGeneratedColumn('increment', { type: 'int4', name: 'id_ticket' })
  idTicket: number;

  @Column({ type: 'varchar', length: 10, name: 'correlativo', unique: true })
  correlativo: string;

  @Column({ name: 'tipo_ticket', type: 'varchar', length: 20 })
  tipoTicket: string;

  @Column({ name: 'titulo', type: 'varchar', length: 200 })
  titulo: string;

  @Column({ name: 'activo'})
  activo: boolean;

  @Column({ name: 'descripcion', type: 'text' })
  descripcion: string;

  @Column({ name: 'estado', type: 'varchar', length: 50 })
  estado: string;

  @Column({ name: 'prioridad', type: 'varchar', length: 20 })
  prioridad: string;

  @Column({ name: 'tipo', type: 'varchar', length: 50 })
  tipo: string;
  @Column({ name: 'creado_por_id', type: 'bigint' })
  creadoPorId: string;

  @Column({ name: 'asignado_a_id', type: 'bigint', nullable: true })
  asignadoAId?: string | null;

  @Column({ name: 'tiempo_estimado', type: 'int', nullable: true })
  tiempoEstimado?: number;


  @CreateDateColumn({
    name: 'fecha_creacion',
    type: 'timestamptz',
    default: () => 'NOW()',
  })
  fechaCreacion: Date;

  @UpdateDateColumn({
    name: 'fecha_actualizacion',
    type: 'timestamptz',
    default: () => 'NOW()',
  })
  fechaActualizacion: Date;
}

