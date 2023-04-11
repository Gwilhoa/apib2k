import { Waifu } from "../waifus/waifus.entity";

export class WaifuMembersDTO {
    id: string;
    level: number;
    exp: number;
    waifu: Waifu;
    rarety: number;
}