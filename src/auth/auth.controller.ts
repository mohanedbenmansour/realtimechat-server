import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDTO, RegisterDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private userService: UserService) {}
  @Post('login')
  async login(@Body() UserDTO: LoginDTO) {
    return await this.userService.findByLogin(UserDTO);
  }

  @Post('register')
  async register(@Body() UserDTO: RegisterDTO) {
    return await this.userService.create(UserDTO);
  }
}
