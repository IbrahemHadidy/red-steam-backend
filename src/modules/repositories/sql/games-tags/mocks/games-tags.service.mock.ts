import { ConflictException, NotFoundException } from '@nestjs/common';
import { GameTag } from '@repositories/sql/games-tags/game-tag.entity';
import { GamesTagsService } from '@repositories/sql/games-tags/games-tags.service';

export class GamesTagsServiceMock implements Partial<GamesTagsService> {
  private tags: GameTag[] = [];

  public async create(name: string): Promise<GameTag> {
    const existingTag = this.tags.find((tag) => tag.name === name);
    if (existingTag) throw new ConflictException('Game tag already exists');
    const newTag: GameTag = {
      id: this.tags.length + 1,
      name,
      games: [],
      users: [],
      hasId: () => null,
      save: () => null,
      remove: () => null,
      softRemove: () => null,
      recover: () => null,
      reload: () => null,
    }; // Mock ID generation
    this.tags.push(newTag);
    return newTag;
  }

  public async getAll(orderBy: 'id' | 'name', order: 'ASC' | 'DESC'): Promise<GameTag[]> {
    return [...this.tags].sort((a, b) => {
      if (a[orderBy] < b[orderBy]) return order === 'ASC' ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return order === 'ASC' ? 1 : -1;
      return 0;
    });
  }

  public async getByName(name: string): Promise<GameTag> {
    const tag = this.tags.find((tag) => tag.name === name);
    if (!tag) throw new NotFoundException('Game tag not found');
    return tag;
  }

  public async getByNameList(names: string[]): Promise<GameTag[]> {
    return this.tags.filter((tag) => names.includes(tag.name));
  }

  public async getById(id: number): Promise<GameTag> {
    const tag = this.tags.find((tag) => tag.id === id);
    if (!tag) throw new NotFoundException('Game tag not found');
    return tag;
  }

  public async getByIds(ids: number[]): Promise<GameTag[]> {
    return this.tags.filter((tag) => ids.includes(tag.id));
  }

  public async remove(id: number): Promise<GameTag> {
    const index = this.tags.findIndex((tag) => tag.id === id);
    if (index === -1) throw new NotFoundException('Game tag not found');
    const removedTag = this.tags.splice(index, 1)[0];
    return removedTag;
  }

  public async removeList(ids: number[]): Promise<GameTag[]> {
    const removedTags: GameTag[] = [];
    ids.forEach((id) => {
      const index = this.tags.findIndex((tag) => tag.id === id);
      if (index !== -1) removedTags.push(this.tags.splice(index, 1)[0]);
    });
    return removedTags;
  }

  public async removeByName(name: string): Promise<GameTag> {
    const tag = await this.getByName(name);
    return this.remove(tag.id);
  }

  public async removeByNameList(names: string[]): Promise<GameTag[]> {
    const tags = await this.getByNameList(names);
    const ids = tags.map((tag) => tag.id);
    return this.removeList(ids);
  }

  public async removeAll(): Promise<void> {
    this.tags = [];
  }
}
