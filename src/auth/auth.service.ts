import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(email: string, password: string) {
    const existingUser = await this.prisma.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
    );

    return { token };
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' },
    );

    return { token };
  }
}
