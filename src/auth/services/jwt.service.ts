import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService as NestJwtService } from '@nestjs/jwt';

@Injectable()
export class JwtService {

    constructor(private readonly jwt: NestJwtService) {}

    public encodePassword(password: string): string {
        return bcrypt.hashSync(password, 10);
    }

    public isPasswordValid(password: string, userPassword: string): boolean {
        return bcrypt.compareSync(password, userPassword);
    }
}
