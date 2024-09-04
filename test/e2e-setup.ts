import { DatabaseService } from '@services/database/database.service';
import { DataSource } from 'typeorm';

export async function cleanAllEntities(databaseService: DatabaseService) {
  // Initialize data sources
  const postgresDataSource: DataSource = await databaseService.getPostgresDataSource();
  const mongoDataSource: DataSource = await databaseService.getMongoDataSource();

  // PostgreSQL cleanup
  try {
    const entities = postgresDataSource.entityMetadatas;

    for (const entity of entities) {
      const repository = postgresDataSource.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    }
  } finally {
    await postgresDataSource.destroy();
  }

  // MongoDB cleanup
  try {
    const mongoEntities = mongoDataSource.entityMetadatas;

    for (const entity of mongoEntities) {
      const repository = mongoDataSource.getMongoRepository(entity.name);
      await repository.deleteMany({});
    }
  } finally {
    await mongoDataSource.destroy();
  }
}
