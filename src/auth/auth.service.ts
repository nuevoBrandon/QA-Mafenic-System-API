import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { IResponse } from 'src/Interfaces';
import { LoginDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) { }

  async login(loginDto: LoginDto): Promise<IResponse<any>> {
    try {
      const {Name,Password} = loginDto
      const user = await  this.usersRepository.findOne({
        where:{
          Name:Name,
          Active:'Y'
        }
      })

      if(!user) {
        throw new NotFoundException("Usuario no encontrado")
      }

      const validatePassword = await bcrypt.compare(Password,user.Password)

      if(!validatePassword) {
        throw new NotFoundException("Contraseña Incorrecta")
      }

       const token = this.jwtService.sign({
        id: user.IdUser,
        name: user.Name,
        rol: user.Rol,
      });

      return {
        code: '000',
        message: 'ok',
        data: token
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async create(createAuthDto: CreateAuthDto): Promise<IResponse<any>> {
    try {
      const user = new User()
      user.Name = createAuthDto.Name
      user.Rol = createAuthDto.Rol
      user.Password = createAuthDto.Password
      user.CreateDate = new Date()
      user.Active = 'Y'
      await this.usersRepository.save(user);
      return {
        code: '000',
        message: 'Se creo con exito!',
        data: null
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async findAll():  Promise<IResponse<any>> {
    try {
      const data = await this.usersRepository.find({
        select: ['IdUser', 'Name', 'Rol', 'Active','CreateDate']
      });
      return {
        code: '000',
        message: 'success',
        data: data
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.usersRepository.findOne({
        where: {
          IdUser: id
        },
        select: ['IdUser', 'Name', 'Rol', 'Active']
      });
      return {
        code: '000',
        message: 'success',
        data: data
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
