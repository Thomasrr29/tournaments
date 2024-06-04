import { IsNotEmpty, IsNumber } from "class-validator"
import { ApiProperty } from "@nestjs/swagger";

export class CreateResultDto {

    @ApiProperty({
        description: 'The ID of the player',
        example: 1,
      })
      @IsNumber()
      @IsNotEmpty()
      playerId: number;
    
      @ApiProperty({
        description: 'The ID of the tournament',
        example: 1,
      })
      @IsNumber()
      @IsNotEmpty()
      tournamentId: number;
    
      @ApiProperty({
        description: 'The result of the player in the tournament',
        example: 100,
      })
      @IsNumber()
      @IsNotEmpty()
      result: number;

}
