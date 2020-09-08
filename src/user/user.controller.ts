import { Controller, Get, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('getUser/:id')
  async getUserByid(@Param('id') id: string) {
    const user = await this.userService.findUserById(id);
    console.log(user);
    return user;
  }
  @Put('addFriend/:Userid/:id')
  async addFriend(@Param('Userid') UserId: string, @Param('id') id: string) {
    const user = await this.userService.addFriend(UserId, id);
  }
  @Get('getFriends/:id')
  async getFriends(@Param('id') id: string) {
    return await this.userService.getFriends(id);
  }
  @Get('all')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
