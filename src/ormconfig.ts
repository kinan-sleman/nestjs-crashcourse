import { DataSource } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions.js";

console.log({
    PGHOST: process.env.PGHOST,
    PGPORT: process.env.PGPORT,
    PGUSER: process.env.PGUSER,
    PGPASSWORD: process.env.PGPASSWORD,
    PGDATABASE: process.env.PGDATABASE,
    production: process.env.NODE_ENV,
})
const config: PostgresConnectionOptions = {
    type: 'postgres',
    host: process.env.PGHOST,
    port: parseInt(String(process.env.PGPORT), 10),
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrationsTableName: "migrations",
    migrations: [__dirname + "/migrations/**/*.ts"],
    ssl: Boolean(process.env.PGSSL),
}
const AppDataSource = new DataSource(config)
export {
    AppDataSource
}

export default config