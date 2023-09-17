import { Injectable } from '@nestjs/common';
import { RoleCategorie } from './rolecategory.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { isHexadecimal } from 'class-validator';
import { roles, sendRoleRequest } from "../DiscordEvent/roles";

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleCategorie)
    private roleCategorieRepository: Repository<RoleCategorie>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}
  async createRoleCategory(name: string, color: string) {
    if (name == null || color == null) throw new Error('Missing parameters');
    if (!isHexadecimal(color)) throw new Error('Color is not hexadecimal');
    const categories = await this.roleCategorieRepository.find();
    for (const categorie of categories) {
      if (categorie.name == name)
        throw new Error('Role category already exists');
    }
    const roleCategorie = new RoleCategorie();
    roleCategorie.name = name;
    roleCategorie.color = color;
    return await this.roleCategorieRepository.save(roleCategorie);
  }

  async getRoleCategories() {
    return await this.roleCategorieRepository
      .createQueryBuilder('rolecategory')
      .leftJoinAndSelect('rolecategory.children', 'role')
      .getMany();
  }

  async getRoleCategoryById(id) {
    return await this.roleCategorieRepository
      .createQueryBuilder('rolecategory')
      .leftJoinAndSelect('rolecategory.children', 'role')
      .where('rolecategory.id = :id', { id: id })
      .getOne();
  }

  async createRole(name, category_id) {
    if (name == null || category_id == null)
      throw new Error('Missing parameters');
    for (const role of await this.roleRepository.find()) {
      if (role.name == name) throw new Error('Role already exists');
    }
    const category = await this.getRoleCategoryById(category_id);
    if (category == null) throw new Error('Category does not exist');
    const role = new Role();
    const roleD = await roles(name, category.color);
    role.name = name;
    role.parent = category;
    role.id = roleD.id;
    return await this.roleRepository.save(role);
  }

  async createRoleWithAuth(name, category_id, username) {
    if (name == null || category_id == null)
      throw new Error('Missing parameters');
    for (const role of await this.roleRepository.find()) {
      if (role.name == name) throw new Error('Role already exists');
    }
    const category = await this.getRoleCategoryById(category_id);
    if (category == null) throw new Error('Category does not exist');
    await sendRoleRequest(username, name, category.name);
  }

  async getRoleById(id) {
    return await this.roleRepository
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.parent', 'rolecategory')
      .where('role.id = :id', { id: id })
      .getOne();
  }
}
