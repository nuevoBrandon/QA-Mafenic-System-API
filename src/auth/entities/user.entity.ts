import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    IdUser: number;

    @Column()
    Name: string;

    @Column()
    Rol: string;

    @Column()
    Password: string;

    @CreateDateColumn()
    CreateDate: Date;

    @UpdateDateColumn()
    UpdateDate: Date;

    @Column()
    Active: string;

    @BeforeInsert()
    async hashPassword() {
        const salt = await bcrypt.genSalt();
        this.Password = await bcrypt.hash(this.Password, salt);
    }
}
