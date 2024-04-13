import { IsNotEmpty, IsString, NotEquals } from "class-validator";

export class RefreshTokenDTO {
    @IsString()
    refreshToken: string;
}