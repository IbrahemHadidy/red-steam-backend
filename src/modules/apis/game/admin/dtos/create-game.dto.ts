// Class-transformer
import { Type } from 'class-transformer';

// Class-validator
import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';

// Swagger
import { ApiProperty } from '@nestjs/swagger';

class ImageEntriesDto {
  @IsNotEmpty()
  @IsNumber()
  readonly order: number;

  @IsOptional()
  @IsString()
  readonly featured?: boolean;
}

class VideoEntriesDto {
  @IsNotEmpty()
  @IsNumber()
  readonly order: number;
}

class PricingDto {
  @IsNotEmpty()
  @IsBoolean()
  readonly free: boolean;

  @IsOptional()
  @IsNumber()
  readonly basePrice?: number;
}

class LanguageDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly interface: boolean;

  @IsNotEmpty()
  @IsBoolean()
  readonly fullAudio: boolean;

  @IsNotEmpty()
  @IsBoolean()
  readonly subtitles: boolean;
}

class SystemRequirementDto {
  @IsOptional()
  @IsString()
  readonly os?: string;

  @IsOptional()
  @IsString()
  readonly cpu?: string;

  @IsOptional()
  @IsString()
  readonly ram?: string;

  @IsOptional()
  @IsString()
  readonly gpu?: string;

  @IsOptional()
  @IsString()
  readonly dx?: string;

  @IsOptional()
  @IsString()
  readonly network?: string;

  @IsOptional()
  @IsString()
  readonly storage?: string;

  @IsOptional()
  @IsString()
  readonly additionalNotes?: string;

  @IsOptional()
  @IsString()
  readonly soundCard?: string;

  @IsOptional()
  @IsString()
  readonly vrSupport?: string;
}

class SystemRequirementsDto {
  @IsNotEmpty()
  @IsBoolean()
  readonly req64: boolean;

  @IsNotEmpty()
  @Type(() => SystemRequirementDto)
  readonly mini: SystemRequirementDto;

  @IsNotEmpty()
  @Type(() => SystemRequirementDto)
  readonly recommended: SystemRequirementDto;
}

class PlatformsDto {
  @IsNotEmpty()
  @IsBoolean()
  readonly win: boolean;

  @IsNotEmpty()
  @IsBoolean()
  readonly mac: boolean;
}

export class CreateGameDto {
  @ApiProperty({ description: 'The name of the game', example: 'Red Dead Redemption 2', required: true })
  @IsNotEmpty({ message: 'The name of the game is required' })
  @IsString({ message: 'The name of the game must be a string' })
  readonly name: string;

  @ApiProperty({ description: 'The category of the game', example: 'Action', required: true })
  @IsNotEmpty({ message: 'The category of the game is required' })
  @IsString({ message: 'The category of the game must be a string' })
  readonly category: string;

  @ApiProperty({ description: 'The description of the game', example: 'An epic game', required: true })
  @IsNotEmpty({ message: 'The description of the game is required' })
  @IsString({ message: 'The description of the game must be a string' })
  readonly description: string;

  @ApiProperty({ description: 'The release date of the game', example: '2022-10-10', required: true })
  @IsDate({ message: 'The release date of the game must be a date' })
  @IsNotEmpty({ message: 'The release date of the game is required' })
  @Type(() => Date)
  readonly releaseDate: Date;

  @ApiProperty({ description: 'The featured status of the game', example: 'true', required: true })
  @IsBoolean({ message: 'The featured status of the game must be a boolean' })
  @IsNotEmpty({ message: 'The featured status of the game is required' })
  readonly featured: boolean;

  @ApiProperty({ description: 'The developers ids of the game', example: '[1, 2]', required: true, type: 'array' })
  @IsNotEmpty({ message: 'The developers of the game is required', each: true })
  @IsArray({ message: 'The developers of the game must be an array' })
  @IsNumber({ allowNaN: false }, { each: true, message: 'The developers of the game must be a number' })
  readonly developers: number[];

  @ApiProperty({ description: 'The publishers ids of the game', example: '[1, 2]', required: true, type: 'array' })
  @IsNotEmpty({ message: 'The publishers of the game is required', each: true })
  @IsArray({ message: 'The publishers of the game must be an array' })
  @IsNumber({ allowNaN: false }, { each: true, message: 'The publishers of the game must be a number' })
  readonly publishers: number[];

  @ApiProperty({
    description: 'The Image entries of the game',
    example: '{"order": 1, "featured": true}',
    required: true,
    type: 'array',
  })
  @IsArray({ message: 'The Image entries of the game must be an array' })
  @IsNotEmpty({ message: 'The Image entries of the game is required', each: true })
  @Type(() => ImageEntriesDto)
  readonly imageEntries: ImageEntriesDto[];

  @ApiProperty({
    description: 'The Video entries of the game',
    example: '{"order": 2}',
    required: true,
    type: 'array',
  })
  @IsArray({ message: 'The Video entries of the game must be an array' })
  @IsOptional()
  @Type(() => VideoEntriesDto)
  readonly videoEntries: VideoEntriesDto[];

  @ApiProperty({
    description: 'The price of the game',
    example: '{"free": false, "basePrice": 12.5}',
    required: true,
    type: 'object',
  })
  @IsNotEmpty({ message: 'The price of the game is required' })
  @IsObject({ message: 'The price of the game must be an object' })
  @Type(() => PricingDto)
  readonly pricing: PricingDto;

  @ApiProperty({ description: 'The game tags', example: '[1, 2]', required: true, type: 'array' })
  @IsNotEmpty({ message: 'The game tags is required', each: true })
  @IsArray({ message: 'The game tags must be an array' })
  @IsNumber({ allowNaN: false }, { each: true, message: 'The game tags must be a number' })
  readonly tags: number[];

  @ApiProperty({ description: 'The game features', example: '[1, 2]', required: true, type: 'array' })
  @IsNotEmpty({ message: 'The game features is required', each: true })
  @IsArray({ message: 'The game features must be an array' })
  @IsNumber({ allowNaN: false }, { each: true, message: 'The game features must be a number' })
  readonly features: number[];

  @ApiProperty({
    description: 'The game languages',
    example: '[{name: "English (US)", interface: true, fullAudio: true, subtitles: true}]',
    required: true,
    type: 'array',
  })
  @IsArray({ message: 'The game languages must be an array' })
  @Type(() => LanguageDto)
  readonly languages: LanguageDto[];

  @ApiProperty({ description: 'The game platforms', example: '{win: true, mac: true}', required: true, type: 'object' })
  @IsNotEmpty({ message: 'The game platforms is required' })
  @IsObject({ message: 'The game platforms must be an object' })
  @Type(() => PlatformsDto)
  readonly platformEntries: PlatformsDto;

  @ApiProperty({
    description: 'The game system requirements',
    example: `
    {
      req64: true,
      mini: {
        os: "Windows 7",
        cpu: "Intel Core 2 Quad Q6600",
        ram: "4 GB",
        gpu: "NVIDIA 9800 GT",
        dx: "9.0c",
        network: "802.11 b/g/n",
        storage: "32 GB",
        soundCard: "AMD Phenom II X4 945",
        vrSupport: "VR Supported",
        additionalNotes: "VR Supported"
      },
      recommended: {
        os: "Windows 10",
        cpu: "Intel Core i5-4590",
        ram: "8 GB",
        gpu: "NVIDIA GTX 660",
        dx: "9.0c",
        network: "802.11 b/g/n",
        storage: "64 GB",
        soundCard: "AMD Phenom II X4 945",
        vrSupport: "VR Supported",
        additionalNotes: "VR Supported"
      }
    }
    `,
    required: true,
    type: 'object',
  })
  @IsNotEmpty({ message: 'The game system requirements is required' })
  @IsObject({ message: 'The game system requirements must be an object' })
  @Type(() => SystemRequirementsDto)
  readonly systemRequirements: SystemRequirementsDto;

  @ApiProperty({ description: 'The game link', example: 'https://www.battlefield.com/', required: false })
  @IsOptional()
  @IsString({ message: 'The game link must be a string' })
  readonly link?: string;

  @ApiProperty({ description: 'The game about', example: 'enter HTML here', required: true })
  @IsNotEmpty({ message: 'The game about is required' })
  @IsString({ message: 'The game about must be a string' })
  readonly about: string;

  @ApiProperty({ description: 'The game mature status', example: 'true', required: true })
  @IsNotEmpty({ message: 'The game mature status is required' })
  @IsBoolean({ message: 'The game mature status must be a boolean' })
  readonly mature: boolean;

  @ApiProperty({ description: 'The game mature description', example: 'enter HTML here' })
  @IsOptional()
  @IsString({ message: 'The game mature description must be a string' })
  readonly matureDescription: string;

  @ApiProperty({ description: 'The game legal', example: 'enter HTML here' })
  @IsOptional()
  @IsString({ message: 'The game legal must be a string' })
  readonly legal?: string;
}
