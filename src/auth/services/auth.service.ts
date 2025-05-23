import { Inject, Injectable } from '@nestjs/common';
import { ChangePasswordRequestDto, LoginRequestDto, RegisterRequestDto } from '../dto/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { JwtService } from './jwt.service';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>
    ) {}

    @Inject(JwtService)
    private readonly jwtService: JwtService;

    public async login({email, password}: LoginRequestDto): Promise<string | object> {
        const user = await this.userModel.findOne({ email: email });
        if (!user) {
            throw new RpcException('El usuario no existe');
        }

        const isPasswordValid: boolean = this.jwtService.isPasswordValid(password, user.password);

        if(!isPasswordValid) {
            throw new RpcException('Contraseña incorrecta');
        }

        return { id: user._id, email: user.email, role: user.role };
    };

    public async register(user: RegisterRequestDto): Promise<RegisterRequestDto> {
        const existingUser = await this.userModel.findOne({ email: user.email });
        if (existingUser) {
            throw new RpcException('El usuario ingresado ya se encuentra registrado');
        }
        user.password = this.jwtService.encodePassword(user.password);
        const newUser = new this.userModel(user);
        
        return newUser.save();    
    };

    public async recoverPassword(email): Promise<string> {
        return `Password recovery link sent to ${email}`;
    }

    public async changePassword(data: ChangePasswordRequestDto): Promise<string> {
        const user = await this.userModel.findOne({ email: data.email });
        if (!user) {
            throw new Error('User not found');
        }
        if (data.newPassword !== data.confirmPassword) {
            throw new Error('Passwords do not match');
        }
        user.password = this.jwtService.encodePassword(data.newPassword);
        await user.save();
        
        return `Password changed for ${data.email}`;
    }

    public async getUserByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ email: email });
    }

    public async getUserById(_id: string): Promise<User | null> {
        return this.userModel.findById(_id); 
    }

    public async getAllUsers(): Promise<User[]> {
        return this.userModel.find({});
    }

    public async updateUser(_id: string, userData: Partial<User>): Promise<User> {
        const user = await this.userModel.findById(_id);
        if (!user) {
            throw new Error('User not found');
        }
        Object.assign(user, userData);
        return user.save();
    }

    public async deleteUser(_id: string): Promise<string> {
        const user = await this.userModel.findById(_id);
        if (!user) { 
            throw new Error('User not found');
        }
        await user.deleteOne({ _id: _id });
        return 'User deleted successfully'; 
    }



}
