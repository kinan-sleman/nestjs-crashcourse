import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions.js";

const config : PostgresConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: "devuser",
    password: "1234",
    database: "blog",
    // we need to add this to support all entities that in our project
    entities: [__dirname + '/**/*.entity.{.ts, .js}'],
    // in each time we'll run our application, we need to refresh our database depending on our application entities
    // in this case we need to add this line:
    synchronize: true, // don't use it in production
}

export default config