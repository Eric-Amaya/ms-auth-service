import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class JwtService {

    public encodePassword(password: string): string {
        return bcrypt.hashSync(password, 10);
    }

    public isPasswordValid(password: string, userPassword: string): boolean {
        return bcrypt.compareSync(password, userPassword);
    }
}
