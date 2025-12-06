import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions.js";

const config: PostgresConnectionOptions = {
    type: 'postgres',
    host: process.env.PGHOST || 'localhost',
    port: parseInt(String(process.env.PGPORT), 10) || 5432,
    username: process.env.PGUSER || "postgres",
    password: process.env.PGPASSWORD || "12345678",
    database: process.env.PGDATABASE || "blog",
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrationsTableName: "migrations",
    migrations: [__dirname + "/migrations/**/*.ts"],
    // required for production:
    ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false,
    } : false,
}
const AppDataSource = new DataSource(config)
export {
    AppDataSource
}

export default config