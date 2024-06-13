import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { CompaniesService } from '@repositories/sql/companies/companies.service';
import { Publisher, Developer } from '@repositories/sql/companies/company.entity';

export class CompaniesServiceMock implements Partial<CompaniesService> {
  private publishers: Publisher[] = [];
  private developers: Developer[] = [];
  private nextId: number = 1;

  private async checkCompanyExists(
    checkBy: 'id' | 'name' | 'website',
    checkValue: number | string,
    type: 'publisher' | 'developer',
  ): Promise<void> {
    const repository = type === 'publisher' ? this.publishers : this.developers;
    const company = repository.find((company) => company[checkBy] === checkValue);
    if (!company) throw new NotFoundException(`${type.charAt(0).toUpperCase() + type.slice(1)} not found`);
  }

  private async checkValueIsUnique(
    updateType: 'name' | 'website',
    value: string,
    type: 'publisher' | 'developer',
  ): Promise<void> {
    const repository = type === 'publisher' ? this.publishers : this.developers;
    const company = repository.find((company) => company[updateType] === value);
    if (company)
      throw new ConflictException(`${type.charAt(0).toUpperCase() + type.slice(1)} ${updateType} already exists`);
  }

  private async checkValidWebsite(website: string): Promise<void> {
    const urlRegex = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
    if (!website.match(urlRegex)) throw new BadRequestException('Invalid website URL');
  }

  public async getAll(
    sortBy: 'id' | 'name' | 'website',
    sortOrder: 'asc' | 'desc',
    type: 'publishers' | 'developers',
  ): Promise<Publisher[] | Developer[]> {
    const repository = type === 'publishers' ? this.publishers : this.developers;
    return repository.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (a[sortBy] > b[sortBy]) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  public async getById(id: number, type: 'publisher' | 'developer'): Promise<Publisher | Developer> {
    const repository = type === 'publisher' ? this.publishers : this.developers;
    const company = repository.find((company) => company.id === id);
    if (!company) throw new NotFoundException(`${type.charAt(0).toUpperCase() + type.slice(1)} not found`);
    return company;
  }

  public async getByIds(ids: number[], type: 'publisher' | 'developer'): Promise<Publisher[] | Developer[]> {
    const repository = type === 'publisher' ? this.publishers : this.developers;
    const companies = repository.filter((company) => ids.includes(company.id));
    if (companies.length !== ids.length) {
      const missingIds = ids.filter((id) => !companies.some((company) => company.id === id));
      throw new NotFoundException(
        `${type.charAt(0).toUpperCase() + type.slice(1)} not found: ${missingIds.join(', ')}`,
      );
    }
    return companies;
  }

  public async getByName(name: string, type: 'publisher' | 'developer'): Promise<Publisher | Developer> {
    const repository = type === 'publisher' ? this.publishers : this.developers;
    const company = repository.find((company) => company.name === name);
    if (!company) throw new NotFoundException(`${type.charAt(0).toUpperCase() + type.slice(1)} not found`);
    return company;
  }

  public async create(
    company: { name: string; website: string },
    type: 'publisher' | 'developer',
  ): Promise<Publisher | Developer> {
    await this.checkValueIsUnique('name', company.name, type);
    await this.checkValueIsUnique('website', company.website, type);
    await this.checkValidWebsite(company.website);

    const newCompany: Publisher | Developer = {
      id: this.nextId++,
      name: company.name,
      website: company.website,
      games: [],
      hasId: () => null,
      save: () => null,
      remove: () => null,
      softRemove: () => null,
      recover: () => null,
      reload: () => null,
    };

    if (type === 'publisher') {
      this.publishers.push(newCompany as Publisher);
    } else {
      this.developers.push(newCompany as Developer);
    }

    return newCompany;
  }

  public async update(
    id: number,
    updateType: 'name' | 'website',
    value: string,
    type: 'publisher' | 'developer',
  ): Promise<Publisher | Developer> {
    await this.checkCompanyExists('id', id, type);
    await this.checkValueIsUnique(updateType, value, type);

    if (updateType === 'website') {
      await this.checkValidWebsite(value);
    }

    const repository = type === 'publisher' ? this.publishers : this.developers;
    const company = repository.find((company) => company.id === id);
    company[updateType] = value;

    return company;
  }

  public async remove(id: number, type: 'publisher' | 'developer'): Promise<void> {
    await this.checkCompanyExists('id', id, type);

    if (type === 'publisher') {
      this.publishers = this.publishers.filter((publisher) => publisher.id !== id);
    } else {
      this.developers = this.developers.filter((developer) => developer.id !== id);
    }
  }

  public async removeAll(type: 'publishers' | 'developers'): Promise<void> {
    if (type === 'publishers') {
      this.publishers = [];
    } else {
      this.developers = [];
    }
  }
}
