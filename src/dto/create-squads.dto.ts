import { IsNotEmpty } from 'class-validator';

export class CreateSquadDTO {
  @IsNotEmpty({ message: 'id is required' })
  id: string;
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  color: string;
}
