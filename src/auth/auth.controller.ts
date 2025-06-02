import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ChangePasswordRequestDto, LoginRequestDto, RegisterRequestDto } from './dto/auth.dto';
import { AuthService } from './services/auth.service';
import { UserRequestDto } from './dto/user.dto';
import { User } from './schemas/user.schema';
import { MessagePattern } from '@nestjs/microservices';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Controller()
export class AuthController {
    @Inject(AuthService)
    private readonly service: AuthService;
    
    @MessagePattern('login')
    login(payload: LoginRequestDto): Promise<string | object> {
        return this.service.login(payload);
    }

    @MessagePattern('register')
    register(payload: RegisterRequestDto): Promise<RegisterRequestDto> { 
        return this.service.register(payload);
    }

    @Get('recover-password')
    recoverPassword(@Query('email') email: string): Promise<string> {
        return this.service.recoverPassword(email);
    }

    @MessagePattern('change-password')
    changePassword(payload: ChangePasswordRequestDto): Promise<string> {
        return this.service.changePassword(payload);
    }

    @MessagePattern('get-user-by-email')
    getUserByEmail(data: { email: string }) {
        return this.service.getUserByEmail(data.email);
    }

    @MessagePattern('get-user-by-id')
    getUserById(data: { _id: string }): Promise<UserRequestDto | null> {
      return this.service.getUserById(data._id);
    }
  
    @MessagePattern('get-all-users')
    getUsers(): Promise<UserRequestDto[]> {
      return this.service.getAllUsers();
    }
  
    @MessagePattern('update-user')
    updateUser(data: { _id: string; updateData: Partial<User> }): Promise<User> {
      return this.service.updateUser(data._id, data.updateData);
    }
  
    @MessagePattern('delete-user')
    deleteUser(data: { _id: string }): Promise<string> {
      return this.service.deleteUser(data._id);
    }
  @MessagePattern('update-user-document')
  updateUserDocument(data: { _id: string; document: UpdateDocumentDto }): Promise<User> {
    return this.service.updateUserDocument(data._id, data.document);
}
}
