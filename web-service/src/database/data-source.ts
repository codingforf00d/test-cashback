import { DataSource } from "typeorm"
import { Transaction, User } from "./entities"

export const databaseProviders = [
    {
      provide: 'DATA_SOURCE',
      useFactory: async () => {
        const dataSource = new DataSource({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: process.env.POSTGRES_PASSWORD ?? 'example',
            database: "postgres",
            synchronize: true,
            logging: true,
            entities: [User, Transaction],
            subscribers: [],
            migrations: [],
        });
  
        return dataSource.initialize();
      },
    },
  ];