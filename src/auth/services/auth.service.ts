import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ChangePasswordRequestDto, LoginRequestDto, RegisterRequestDto } from '../dto/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { JwtService } from './jwt.service';
import { UpdateDocumentDto } from '../dto/update-document.dto';
import { UserRequestDto } from '../dto/user.dto';
import { plainToInstance } from 'class-transformer';

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
            throw new Error('User not found');
        }

        const isPasswordValid: boolean = this.jwtService.isPasswordValid(password, user.password);

        if(!isPasswordValid) {
            throw new Error('Invalid password');
        }

        return { id: user._id, email: user.email, role: user.role };
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

    public async getUserById(_id: string): Promise<UserRequestDto | null> {
        const user = await this.userModel.findById(_id).lean();
        if (!user) return null;
            return plainToInstance(UserRequestDto, user);
    }

    
    public async getAllUsers(): Promise<any[]> {
        return this.userModel.find().lean();
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
    
   async updateUserDocument(userId: string, document: UpdateDocumentDto): Promise<User> {
         const user = await this.userModel.findById(userId);
         if (!user) throw new NotFoundException('Usuario no encontrado');

         const index = user.requiredDocuments.findIndex(doc => doc.name === document.name);
         if (index === -1) throw new BadRequestException('Documento no reconocido');

         // Convertir string a Date si viene como string
         const docToUpdate = {
            ...user.requiredDocuments[index],
            ...document,
            expirationDate: document.expirationDate
            ? new Date(document.expirationDate)
            : undefined,
    };

     user.requiredDocuments[index] = docToUpdate;
         return user.save();
    }



}
