import { Inject, Injectable } from '@nestjs/common';
import { ChangePasswordRequestDto, LoginRequestDto, RecoverPasswordRequestDto, RegisterRequestDto } from '../auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { JwtService } from './jwt.service';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>
    ) {}

    @Inject(JwtService)
    private readonly jwtService: JwtService;

    public async login({email, password}: LoginRequestDto): Promise<string> {
        const user = await this.userModel.findOne({ email: email });
        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid: boolean = this.jwtService.isPasswordValid(password, user.password);

        if(!isPasswordValid) {
            return 'Invalid password';
        }

        return 'Login successful';
    };

    public async register(user: RegisterRequestDto): Promise<RegisterRequestDto> {
        const existingUser = await this.userModel.findOne({ email: user.email });
        if (existingUser) {
            throw new Error('User already exists');
        }
        user.password = this.jwtService.encodePassword(user.password);
        const newUser = new this.userModel(user);
        
        return newUser.save();    
    };

    public async recoverPassword({email} : RecoverPasswordRequestDto): Promise<string> {
        return `Password recovery link sent to ${email}`;
    }

    public async changePassword(data: ChangePasswordRequestDto): Promise<string> {
        return `Password changed for ${data.email}`;
    }
}
