import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ChangePasswordRequestDto, LoginRequestDto, RecoverPasswordRequestDto, RegisterRequestDto } from './auth.dto';
import { AuthService } from './services/auth.service';

@Controller('auth')
export class AuthController {
    @Inject(AuthService)
    private readonly service: AuthService;
    
    @Get('login')
    login(@Body() payload: LoginRequestDto): Promise<string> {
        return this.service.login(payload);
    }

    @Post('register')
    register(@Body() payload: RegisterRequestDto): Promise<RegisterRequestDto> { 
        return this.service.register(payload);
    }

    @Get('recover-password')
    recoverPassword(@Body() payload: RecoverPasswordRequestDto): Promise<string> {
        return this.service.recoverPassword(payload);
    }
    @Post('change-password')
    changePassword(@Body() payload: ChangePasswordRequestDto): Promise<string> {
        return this.service.changePassword(payload);
    }
}
