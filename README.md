## DEPLOY OUR PROJECT ON RAILWAY

### install railway cli:

```json
    npm install -g @railway/cli
```

### login to railway:

```json
    railway login
```

### or:

```json
    railway login --browserless
```

### create project on railway:

```json
    railway init
> Select a workspace kinan-sleman's Projects
> Project Name nest-blog

Created project nest-blog on kinan-sleman's Projects
https://railway.com/project/ff0ca398-d960-4493-87b7-8d2ec2300b44

D:\Nest JS\projects\blog-nest>
```
### add postgresql database service:

```json
D:\Nest JS\projects\blog-nest>railway add           
> What do you need? Database
> Select databases to add PostgreSQL
  🎉 Added PostgreSQL to project
D:\Nest JS\projects\blog-nest>
```
### add environment variables to ormconfig.ts:
```json
    host: process.env.PGHOST || 'localhost',
    port: parseInt(String(process.env.PGPORT), 10) || 5432,
    username: process.env.PGUSER || "postgres",
    password: process.env.PGPASSWORD || "12345678",
    database: process.env.PGDATABASE || "blog",
```
### apply changes:
```json
railway up
```
