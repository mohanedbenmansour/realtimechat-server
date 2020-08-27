import { Controller, Post, Body, Get, UseGuards, Param } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDTO, RegisterDTO } from './auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  tempAuth() {
    return { auth: 'works' };
  }

  @Post('login')
  async login(@Body() UserDTO: LoginDTO) {
    const user = await this.userService.findByLogin(UserDTO);
    const payload = {
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }

  @Post('register')
  async register(@Body() UserDTO: RegisterDTO) {
    const user = await this.userService.create(UserDTO);
    const payload = {
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const token = await this.authService.signPayload(payload);
    return { user, token };
  }
}
