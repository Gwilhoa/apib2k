import { Injectable } from '@nestjs/common';
import { RoleCategorie } from './rolecategory.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';
import { isHexadecimal } from 'class-validator';
import { announceRole, roles, sendRoleRequest } from '../DiscordEvent/roles';
import { client } from '../main';
import { setVerified } from '../DiscordEvent/authentification';

@Injectable()
export class RoleService {
  private eventListenerAdded = false; // Variable de contrôle pour suivre l'état de l'événement
  private eventCooldown = false; // Variable de contrôle pour gérer le cooldown

  constructor(
    @InjectRepository(RoleCategorie)
    private roleCategorieRepository: Repository<RoleCategorie>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {
    // Ajoutez un gestionnaire d'événement pour l'interaction uniquement si ce n'est pas déjà fait
    if (!this.eventListenerAdded) {
      client.on('interactionCreate', async (interaction) => {
        if (
          interaction.isButton() &&
          interaction.customId === 'approve-connection'
        ) {
          if (!this.eventCooldown) {
            await interaction.channel.send('La connexion a été approuvée !');
            await interaction.message.delete();
            await setVerified(interaction.user.id);

            // Activer le cooldown
            this.eventCooldown = true;
            setTimeout(() => {
              this.eventCooldown = false; // Réactivez l'écoute après 5 secondes
            }, 5000); // 5000 millisecondes = 5 secondes
          }
        } else if (
          interaction.isButton() &&
          interaction.customId.startsWith('add_role')
        ) {
          const args: string[] = interaction.customId.split(';');
          const categoryid = args[1];
          const name = args[2];
          try {
            await this.createRole(name, categoryid);
          } catch (e) {
            return;
          }
          interaction.message.delete();
        }
      });

      this.eventListenerAdded = true; // Marquer l'événement comme ajouté
    }
  }
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
    const Lroles = await await this.roleRepository.find();
    for (const role of Lroles) {
      if (role.name == name) throw new Error('Role already exists');
    }
    const category = await this.getRoleCategoryById(category_id);
    if (category == null) throw new Error('Category does not exist');
    const role = new Role();
    const roleD = await roles(name, category.color);
    role.name = name;
    role.parent = category;
    role.id = roleD.id;
    await announceRole(role.name, category.name);
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
    await sendRoleRequest(username, name, category.name, category.id);
  }

  async getRoleById(id) {
    return await this.roleRepository
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.parent', 'rolecategory')
      .where('role.id = :id', { id: id })
      .getOne();
  }
}
