import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { GameFeature } from '@repositories/sql/games-features/game-feature.entity';
import { GamesFeaturesService } from '@repositories/sql/games-features/games-features.service';

export class GamesFeaturesServiceMock implements Partial<GamesFeaturesService> {
  private features: GameFeature[] = [];
  private nextId: number = 1;

  private async checkFeatureExists(value: number | string, type: 'name' | 'description'): Promise<void> {
    const feature = this.features.find((feature) => feature[type] === value);
    if (feature) throw new ConflictException(`Feature with ${type} ${value} already exists`);
  }

  public async getAll(orderBy: 'id' | 'name' | 'description', order: 'ASC' | 'DESC'): Promise<GameFeature[]> {
    const features = this.features.sort((a, b) => {
      if (order === 'ASC') {
        return a[orderBy] < b[orderBy] ? -1 : a[orderBy] > b[orderBy] ? 1 : 0;
      } else {
        return a[orderBy] > b[orderBy] ? -1 : a[orderBy] < b[orderBy] ? 1 : 0;
      }
    });
    return features;
  }

  public async getById(id: number): Promise<GameFeature> {
    const feature = this.features.find((feature) => feature.id === id);
    if (!feature) throw new NotFoundException(`Feature with ID ${id} not found`);
    return feature;
  }

  public async getByIds(ids: number[]): Promise<GameFeature[]> {
    const features = this.features.filter((feature) => ids.includes(feature.id));
    if (features.length !== ids.length) {
      const missingIds = ids.filter((id) => !features.some((feature) => feature.id === id));
      throw new NotFoundException(`Features with IDs ${missingIds} not found`);
    }
    return features;
  }

  public async getByName(name: string): Promise<GameFeature> {
    const feature = this.features.find((feature) => feature.name === name);
    if (!feature) throw new NotFoundException(`Feature with name ${name} not found`);
    return feature;
  }

  public async getByDescription(description: string): Promise<GameFeature> {
    const feature = this.features.find((feature) => feature.description === description);
    if (!feature) throw new NotFoundException(`Feature with description ${description} not found`);
    return feature;
  }

  public async create(feature: { name: string; description: string }): Promise<GameFeature> {
    await this.checkFeatureExists(feature.name, 'name');
    await this.checkFeatureExists(feature.description, 'description');

    const newFeature = new GameFeature();
    newFeature.id = this.nextId++;
    newFeature.name = feature.name;
    newFeature.description = feature.description;
    this.features.push(newFeature);

    return newFeature;
  }

  public async update(id: number, feature: { name?: string; description?: string }): Promise<GameFeature> {
    const existingFeature = this.features.find((feature) => feature.id === id);
    if (!existingFeature) throw new NotFoundException(`Feature with ID ${id} not found`);

    if (feature.name === undefined && feature.description === undefined)
      throw new InternalServerErrorException('No valid data provided for updating');

    if (feature.name !== undefined) existingFeature.name = feature.name;
    if (feature.description !== undefined) existingFeature.description = feature.description;

    return existingFeature;
  }

  public async remove(id: number): Promise<GameFeature> {
    const index = this.features.findIndex((feature) => feature.id === id);
    if (index === -1) throw new NotFoundException(`Feature with ID ${id} not found`);
    const removedFeature = this.features.splice(index, 1)[0];
    if (!removedFeature) throw new InternalServerErrorException('Failed to remove feature');
    return removedFeature;
  }

  public async removeAll(): Promise<void> {
    this.features = [];
  }
}
