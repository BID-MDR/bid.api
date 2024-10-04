import { ApiProperty } from "@nestjs/swagger";

export abstract class SustainabilityItensRequestDto {
    @ApiProperty({type: Boolean})
    creationExpansion: boolean;

    @ApiProperty({type: Boolean})
    repositioningOfLightPoints: boolean;

    @ApiProperty({type: Boolean})
    lowConsumptionLamps: boolean;

    @ApiProperty({type: Boolean})
    waterEfficientShowerInstallation: boolean;

    @ApiProperty({type: Boolean})
    installingWaterEfficient: boolean;

    @ApiProperty({type: Boolean})
    tankFaucetInstallationWithWater: boolean;

    @ApiProperty({type: Boolean})
    installationOfWaterEfficientToilets: boolean;
    
    @ApiProperty({type: Boolean})
    waterEfficientFaucetInstallationForKitchen: boolean;

    @ApiProperty({type: Boolean})
    useOfToiletBowlForOperation: boolean;

    @ApiProperty({type: Boolean})
    NDA: boolean;
}