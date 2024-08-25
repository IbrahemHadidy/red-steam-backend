import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '@repositories/sql/users/users.service';
import { UserService } from '@apis/user/user.service';

import type { User } from '@repositories/sql/users/user.entity';

@Injectable()
export class AdminService extends UserService {
  constructor(
    protected readonly user: UsersService,
    protected readonly logger: Logger,
  ) {
    super();
  }

  /**
   * Get paginated users
   * @param page - The current page number
   * @param limit - The number of items per page
   * @param orderBy - The column to order by
   * @param order - The order direction
   * @param searchQuery - The search query
   * @returns The paginated users
   * @returns The total number of users
   */
  public async getUsersPaginated(
    page: number,
    limit: number,
    orderBy: 'username' | 'email' | 'country' | 'isVerified' | 'isAdmin' | 'createdAt',
    order: 'ASC' | 'DESC',
    searchQuery: { username?: string },
  ): Promise<{ items: User[]; total: number; totalPages: number }> {
    this.logger.log(
      `Retrieving users, page: ${page}, limit: ${limit}, order by: ${orderBy}, order: ${order}, search query: ${JSON.stringify(searchQuery)}`,
    );
    return await this.user.getUsersPaginated(page, limit, orderBy, order, searchQuery);
  }

  /**
   * Update user
   * @param id - The ID of the user
   * @param data - The new data for the user
   * @returns The updated user
   */
  public async updateUser(id: string, data: { isAdmin?: boolean; isVerified?: boolean }): Promise<{ message: string }> {
    const { isAdmin, isVerified } = data;
    this.logger.log(`Updating user with ID ${id}`);
    await this.user.update(id, { isAdmin, isVerified });
    return { message: 'user updated successfully' };
  }

  /**
   * Delete user
   * @param id - The ID of the user
   * @returns A message indicating the success of the delete
   */
  public async deleteUser(id: string): Promise<{ message: string }> {
    this.logger.log(`Deleting user with ID ${id}`);
    await this.user.remove(id);

    return { message: 'User deleted successfully' };
  }
}