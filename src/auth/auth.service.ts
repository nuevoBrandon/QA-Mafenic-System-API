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

  async findOne(id: number): Promise<IResponse<any>> {
    try {

      const data = await this.usersRepository.findOne({
        where: {
          IdUser: id
        },
        select: ['IdUser', 'Name', 'Rol', 'Active']
      });

      if(!data){
        throw new NotFoundException("No existe el Usuario")
      }

      return {
        code: '000',
        message: 'success',
        data: data
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

  async update(id: number, updateAuthDto: UpdateAuthDto): Promise<IResponse<any>> {
    try {

      await this.findOne(id)

      await this.usersRepository.update(id,{
        Name:updateAuthDto.Name,
        Rol:updateAuthDto.Rol,
        Active:updateAuthDto.Active
      })

      const result = await this.findOne(id)
      return {
        code: '000',
        message: 'Se actulizo con exito!',
        data: result.data
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message)
    }
  }

   async logout(): Promise<IResponse<any>> {
    return {
      code: '000',
      message: 'Sesión cerrada con éxito',
      data: null,
    };
  }
}
