import { ArrayNotEmpty, IsArray, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class AddPlayerTournamentDto {
    
    @ApiProperty({
        description: 'List of player IDs to be added to the tournament',
        type: [Number], // Esto indica que es un array de números
        example: [1, 2, 3]
      })
      @IsArray()
      @ArrayNotEmpty()
      @IsNumber({}, { each: true })
      playersIds: number[];
}