import { ConflictException, Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDTO } from 'src/auth/dto/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(payload: RegisterDTO) {
    const existingUser = await this.userRepo.findOne({
      where: { email: payload.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const user = this.userRepo.create({
      email: payload.email,
      password: hashedPassword,
    });

    return this.userRepo.save(user);
  }

  async findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  async findById(id: string) {
    return this.userRepo.findOne({ where: { id } });
  }
}
