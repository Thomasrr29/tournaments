import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePlayerDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'The name of the player', example: 'Spring Championship' })
    name: string

}
