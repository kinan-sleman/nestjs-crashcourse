import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions.js";

console.log({
    PGHOST: process.env.PGHOST,
    PGPORT: process.env.PGPORT,
    PGUSER: process.env.PGUSER || (process.env.NODE_ENV !== 'production' ? "postgres" : undefined),
    PGPASSWORD: process.env.PGPASSWORD,
    PGDATABASE: process.env.PGDATABASE,
    production: process.env.NODE_ENV,
})
const config: PostgresConnectionOptions = {
    type: 'postgres',
    host: process.env.PGHOST || 'localhost',
    port: parseInt(String(process.env.PGPORT), 10) || 5432,
    username: process.env.PGUSER || (process.env.NODE_ENV !== 'production' ? "postgres" : undefined),
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