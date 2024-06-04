import { IsNotEmpty, IsString } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"

export class CreateTournamentDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'The name of the tournament', example: 'Spring Championship' })
    name: string
}
