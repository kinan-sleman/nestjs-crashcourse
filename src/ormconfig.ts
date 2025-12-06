import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions.js";

const config: PostgresConnectionOptions = {
    type: 'postgres',
    host: process.env.PGHOST,
    url: process.env.DATABASE_URL,
    port: parseInt(String(process.env.PGPORT), 10),
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrationsTableName: "migrations",
    migrations: [__dirname + "/migrations/**/*.ts"],
    ssl: Boolean(process.env.PGSSL),
    extra: process.env.PGSSL === 'true' ? {
        ssl: {
            rejectUnauthorized: false
        }
    } : {}
}
const AppDataSource = new DataSource(config)
export {
    AppDataSource
}

export default config