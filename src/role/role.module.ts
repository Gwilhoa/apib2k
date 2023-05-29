import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { RoleCategorie } from "./rolecategory.entity";
import { Role } from "./role.entity";

@Module({
  providers: [RoleService],
  controllers: [RoleController],
  imports: [
    TypeOrmModule.forFeature([RoleCategorie]),
    TypeOrmModule.forFeature([Role]),
  ],
})
export class RoleModule {}
