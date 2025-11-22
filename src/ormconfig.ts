import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions.js";

const config: PostgresConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: "postgres",
    password: "12345678",
    database: "blog",
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    // we need to remove synchronize , because we don't need to update database when we change entity files
    // synchronize: true, 
    // and we need to enable this line:
    migrationsTableName: "migrations",
    // and we need to add path for migrations:
    migrations: [__dirname + "/migrations/**/*.ts"],
}
// after that we need to create datasource :
const AppDataSource = new DataSource(config)
export {
    AppDataSource
}

export default config