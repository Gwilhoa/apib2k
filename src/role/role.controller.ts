import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { JwtAuthGuard } from '../authentification/jwt.guard';
import { ver } from "../app.controller";

@Controller(ver + 'role')
@UseGuards(JwtAuthGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Post('/category')
  async createRoleCategory(@Res() response, @Body() body) {
    try {
      return response
        .status(201)
        .json(await this.roleService.createRoleCategory(body.name, body.color));
    } catch (e) {
      return response.status(400).json({ message_code: e.message });
    }
  }

  @Get('/category')
  async getRoleCategories(@Res() response) {
    return response
      .status(200)
      .json(await this.roleService.getRoleCategories());
  }

  @Post('/role')
  async createRole(@Res() response, @Body() body) {
    try {
      return response
        .status(201)
        .json(await this.roleService.createRole(body.name, body.category));
    } catch (e) {
      return response.status(400).json({ message_code: e.message });
    }
  }
}
