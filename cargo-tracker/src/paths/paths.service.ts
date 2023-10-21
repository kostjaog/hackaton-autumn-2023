import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { path } from '@prisma/client';
import { CreatePathDto } from './dto/create-path.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PathsService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createPathDto: CreatePathDto): Promise<path> {
    try {
      return this.prismaService.path.create({ data: createPathDto });
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  findAll(): Promise<path[]> {
    try {
      return this.prismaService.path.findMany();
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  async findOne(id: string) {
    try {
      const candidate = await this.prismaService.path.findUnique({
        where: {
          id,
        },
      });

      if (!candidate) {
        throw new HttpException(
          'Paht with provided id does not exist',
          HttpStatus.NOT_FOUND,
        );
      }
      return candidate;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  async remove(id: string): Promise<path> {
    try {
      const candidate = await this.prismaService.path.findUnique({
        where: {
          id,
        },
      });
      if (!candidate) {
        throw new HttpException(
          'Paht with provided id does not exist',
          HttpStatus.NOT_FOUND,
        );
      }
      return candidate;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }
}
