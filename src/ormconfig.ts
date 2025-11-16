import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions.js";

const config : PostgresConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: "postgres",
    password: "12345678",
    database: "blog",
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true, 
}

export default config